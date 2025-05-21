// const modal = document.querySelector('.modal');
// const modalTriggerBtn = document.getElementById('btn-get');
// const modalCloseBtn = document.querySelector('.modal_close');
//
// let hasClickedModalTriggerBtn = false;
// let hasScrolledToEnd = false;
// let initialTimerId;
//
// const openModal = () => {
//     modal.style.display = 'block';
//     document.body.style.overflow = 'hidden';
//     window.removeEventListener('scroll', handleScroll);
//     clearTimeout(initialTimerId);
// };
//
// const closeModal = () => {
//     modal.style.display = 'none';
//     document.body.style.overflow = "";
// };
//
// const handleScroll = () => {
//     const scrolledToBottom = window.innerHeight + window.scrollY >= document.body.offsetHeight;
//
//     if (scrolledToBottom && !hasScrolledToEnd) {
//         hasScrolledToEnd = true;
//         clearTimeout(initialTimerId);
//
//         const isModalCurrentlyOpen = modal.style.display === 'block';
//
//         if (!hasClickedModalTriggerBtn && !isModalCurrentlyOpen) {
//             openModal();
//         }
//     }
// };
//
//
// initialTimerId = setTimeout(() => {
//     const isModalCurrentlyOpen = modal.style.display === 'block';
//     if (!hasClickedModalTriggerBtn && !hasScrolledToEnd && !isModalCurrentlyOpen) {
//         openModal();
//     }
// }, 10000);
//
//
// modalTriggerBtn.addEventListener('click', () => {
//     hasClickedModalTriggerBtn = true;
//     clearTimeout(initialTimerId);
//     openModal();
// });
//
// modalCloseBtn.addEventListener('click', () => {
//     closeModal();
// });
//
// modal.addEventListener('click', (event) => {
//     if (event.target === modal) {
//         closeModal();
//     }
// });
//
// window.addEventListener('scroll', handleScroll);