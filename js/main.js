document.addEventListener('DOMContentLoaded', () => {
  // Inicialização do Accordion do FAQ
  const faqQuestions = document.querySelectorAll('.faq-question');
  
  faqQuestions.forEach(question => {
    question.addEventListener('click', () => {
      const parentItem = question.closest('.faq-item');
      if (!parentItem) return;

      const isActive = parentItem.classList.contains('active');

      // Fechar todos os outros itens abertos (comportamento exclusivo de Accordion)
      document.querySelectorAll('.faq-item').forEach(item => {
        item.classList.remove('active');
        const btn = item.querySelector('.faq-question');
        if (btn) btn.setAttribute('aria-expanded', 'false');
      });

      // Se não estava ativo, abre o item atual
      if (!isActive) {
        parentItem.classList.add('active');
        question.setAttribute('aria-expanded', 'true');
      }
    });
  });
});
