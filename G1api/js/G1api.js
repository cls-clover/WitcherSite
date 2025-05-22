/* 
 * The goal is to create options to implement the remote assets using JS.
 * The only dependency is DOMPurify. https://github.com/cure53/DOMPurify
 * I only suggest it you can obivously do this without it.
 * Make sure to include it before this script.
 * The same goes for Tippy.js - include it before this.
 * If you don't use Tippy.js just remove line 75-104
 */

class G1api
{
	constructor() {
		this.api = 'https://api.gwent.one';
		this.request = {
			key: 'data',
			response: 'html',
			host: 'gwent.one/image', // modify if you are using the asset pack
			language: 'en',
		};
	}

	async apiRequest( request ) { // returns a promise
		// CORS does not like json
		const urlencode = new URLSearchParams(Object.entries(request)).toString();
		try {
			const response = await fetch(this.api, {
				method: 'POST',
				mode: 'cors',
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded',
				},
				body: urlencode,
			});
			return await response.text();
		} catch ( error ) {
			console.log(`Request failed. ${error}`);
		}
	}

	/* 
	 * element: 'className' pass the class you want to listen to
	 * event:  ''           autoload, on page load fetch this class and render to DOM
	 *         'click'      only fetch remote data on click
	 *         'mouseover'  only fetch remote data on hover
	 *         'tippy'      requires Tippy.js https://atomiks.github.io/tippyjs/
	 */
	listen( element, event='' ) {

		const cards  = document.querySelectorAll( element );
		const events = ['click', 'mouseover']; // list of accepted events, modify if you want more

		/*
		 * modify the base json request
		 * add more elements if desired
		 */
		function prepareRequest( card, request ) { // modify the request based on data-attributes

			// there is a fallback here on id. this is mainly to prevent loading 1000 cards if you forgot to include an id.
			// if you see a random Harald's Pal in your implementation it is because you forgot to include an id.
			( !("g1id"      in card.dataset) ) ? (request.id = '201574' ) : (request.id       = card.dataset.g1id     );
			( !("g1html"    in card.dataset) ) ? (delete request.html   ) : (request.html     = card.dataset.g1html   );
			( !("g1version" in card.dataset) ) ? (delete request.version) : (request.version  = card.dataset.g1version);
			( !("g1class"   in card.dataset) ) ? (delete request.class  ) : (request.class    = card.dataset.g1class  );
			return request
		}
		
		if ( events.includes( event ) ) { // event is set, add event listeners to the class
			cards.forEach( card => card.addEventListener( event, () => {
				const request = prepareRequest( card, this.request );
				this.apiRequest( request ).then(response =>
					card.outerHTML = DOMPurify.sanitize( response )
				)
			} ) );
		}
		/* can be fully removed if you don't plan to use it. */
		else if ( event === 'tippy' ) { // set tooltips
			cards.forEach( card => {

				const request  = this.request; // base request
				request.id     = card.dataset.g1id; // id - required!
				request.html   = 'artsize.flavor.keywords'; // medium art and remove text
				request.class  = 'tippy'; // add a tippy class

				const response = this.apiRequest( request );
				
				const tippyCfg = {
					content: 'Fetching card...',
					trigger: 'click',
					/* Please have a delay if you don't use trigger click or a hover will trigger a request immediately */
					/* delay: [500, 300],  */
					theme: 'G1',
					interactive: true,
					maxWidth: '420px',
					allowHTML: true, 
					onShow( instance ) {
						response.then( text => {
							var purified = DOMPurify.sanitize( text );
							instance.setContent( purified );
						} );
					}
				}
				tippy( card, tippyCfg );
			} );
		}
		else { // no event is set autoload the classes
			cards.forEach( card => {
				const request = prepareRequest( card, this.request );
				this.apiRequest( request ).then( response =>
					card.outerHTML = DOMPurify.sanitize( response )
				)
			} );
		}
	}
}

// load the api content after the page has loaded
window.addEventListener( 'load', () => {
	api = new G1api();
	api.listen('.G1-load'); // auto load
	api.listen('.G1-click', 'click');
	api.listen('.G1-hover', 'mouseover');
	api.listen('.G1-tooltip', 'tippy');
} );