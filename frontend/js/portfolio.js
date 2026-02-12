 function filterProjects(category, btnElement) {
      // 1. Remove classe 'active' de todos os botões e adiciona no clicado
      const buttons = document.querySelectorAll('.filter-btn');
      buttons.forEach(btn => btn.classList.remove('active'));
      btnElement.classList.add('active');

      // 2. Filtra os cards
      const cards = document.querySelectorAll('.project-card');
      
      cards.forEach(card => {
        if (category === 'all') {
          card.classList.remove('hide');
          card.classList.add('show');
        } else {
          if (card.getAttribute('data-category') === category) {
            card.classList.remove('hide');
            card.classList.add('show');
          } else {
            card.classList.remove('show');
            card.classList.add('hide');
          }
        }
      });
    }