document.addEventListener('DOMContentLoaded', () => {
  const totalSteps = 9;
  let currentStep = 1;
  const officialPhone = "5561981617033"; // Número oficial do WhatsApp
  
  // Objeto para guardar as respostas do funil
  const answers = {
    clt: '',
    nome: '',
    cpf: '',
    whatsapp: '',
    email: '',
    nascimento: '',
    empresaMais2Anos: '',
    margemDisponivel: '',
    valor: '5.000,00'
  };

  // Capturar valor inicial passado via URL pela Hero da página inicial
  const urlParams = new URLSearchParams(window.location.search);
  const valorParam = urlParams.get('valor');
  if (valorParam) {
    answers.valor = valorParam;
    const qValorInput = document.getElementById('q-valor');
    if (qValorInput) {
      qValorInput.value = answers.valor;
    }
  }

  // Elementos globais da interface
  const stepText = document.getElementById('q-step-text');
  const progressBar = document.getElementById('q-progress-bar');
  const progressWrapper = document.getElementById('progress-wrapper');

  // Atualiza barra de progresso
  function updateProgress(step) {
    if (stepText) stepText.textContent = `Passo ${step}/${totalSteps}`;
    if (progressBar) {
      const percentage = Math.round((step / totalSteps) * 100);
      progressBar.style.width = `${percentage}%`;
    }
  }

  // Navegar para um passo específico
  function goToStep(step) {
    // Ocultar todos os passos
    document.querySelectorAll('.q-step').forEach(el => el.classList.remove('active'));
    
    // Exibir o passo-alvo
    const targetEl = document.querySelector(`.q-step[data-step="${step}"]`);
    if (targetEl) {
      targetEl.classList.add('active');
      currentStep = step;
      updateProgress(currentStep);

      // Focar automaticamente no input se houver
      const input = targetEl.querySelector('input');
      if (input) {
        setTimeout(() => input.focus(), 50);
      }
    }
  }

  // Exibir telas finais (Sucesso ou Restritiva)
  function showScreen(screenType) {
    document.querySelectorAll('.q-step').forEach(el => el.classList.remove('active'));
    if (progressWrapper) progressWrapper.style.display = 'none'; // Oculta barra de progresso no final

    const targetEl = document.getElementById(`screen-${screenType}`);
    if (targetEl) {
      targetEl.classList.add('active');
    }

    // Configurar as URLs do WhatsApp conforme o cenário
    setupWhatsAppLinks(screenType);
  }

  // Configurar URLs dinâmicas para o WhatsApp
  function setupWhatsAppLinks(screenType) {
    const baseUrl = `https://wa.me/${officialPhone}`;

    if (screenType === 'restrictive') {
      const promptText = "Sou CLT mas ainda não tenho os requisitos para contratação, gostaria de simular outras linhas de crédito disponíveis.";
      const encodedText = encodeURIComponent(promptText);
      const btnWaRestrictive = document.getElementById('btn-wa-restrictive');
      if (btnWaRestrictive) {
        btnWaRestrictive.href = `${baseUrl}?text=${encodedText}`;
      }
    } else if (screenType === 'success') {
      // Prompt dinâmico de sucesso integrando todas as variáveis coletadas
      const promptText = `Olá, meu nome é ${answers.nome}, CPF ${answers.cpf}, data de nascimento ${answers.nascimento}, tenho carteira assinada no regime CLT, a empresa que eu trabalho tem mais de 2 anos de constituição, eu possuo margem disponível para contratação e tenho interesse em realizar uma simulação agora para um empréstimo no valor de R$ ${answers.valor}.`;
      const encodedText = encodeURIComponent(promptText);
      const btnWaSuccess = document.getElementById('btn-wa-success');
      if (btnWaSuccess) {
        btnWaSuccess.href = `${baseUrl}?text=${encodedText}`;
      }
    }
  }

  // Exibir mensagem de erro sob os campos
  function showError(elementId, msg) {
    const errEl = document.getElementById(elementId);
    if (errEl) {
      errEl.textContent = msg;
    }
  }

  // Limpar mensagem de erro
  function clearError(elementId) {
    const errEl = document.getElementById(elementId);
    if (errEl) {
      errEl.textContent = '';
    }
  }

  // ==========================================
  // MÁSCARAS DE INPUT (Vanilla JS Puros)
  // ==========================================
  
  // Máscara de CPF: 000.000.000-00
  const inputCpf = document.getElementById('q-cpf');
  if (inputCpf) {
    inputCpf.addEventListener('input', (e) => {
      let v = e.target.value.replace(/\D/g, '');
      if (v.length > 11) v = v.slice(0, 11);
      
      let res = v;
      if (v.length > 9) {
        res = `${v.slice(0,3)}.${v.slice(3,6)}.${v.slice(6,9)}-${v.slice(9)}`;
      } else if (v.length > 6) {
        res = `${v.slice(0,3)}.${v.slice(3,6)}.${v.slice(6)}`;
      } else if (v.length > 3) {
        res = `${v.slice(0,3)}.${v.slice(3)}`;
      }
      e.target.value = res;
      clearError('error-cpf');
    });
  }

  // Máscara de WhatsApp (Telefone): (00) 00000-0000
  const inputWa = document.getElementById('q-whatsapp');
  if (inputWa) {
    inputWa.addEventListener('input', (e) => {
      let v = e.target.value.replace(/\D/g, '');
      if (v.length > 11) v = v.slice(0, 11);

      let res = '';
      if (v.length > 2) {
        res = `(${v.slice(0,2)}) `;
        if (v.length > 7) {
          res += `${v.slice(2,7)}-${v.slice(7)}`;
        } else {
          res += v.slice(2);
        }
      } else if (v.length > 0) {
        res = `(${v}`;
      }
      e.target.value = res;
      clearError('error-whatsapp');
    });
  }

  // Máscara de Data: DD/MM/AAAA
  const inputNascimento = document.getElementById('q-nascimento');
  if (inputNascimento) {
    inputNascimento.addEventListener('input', (e) => {
      let v = e.target.value.replace(/\D/g, '');
      if (v.length > 8) v = v.slice(0, 8);

      let res = '';
      if (v.length > 4) {
        res = `${v.slice(0,2)}/${v.slice(2,4)}/${v.slice(4)}`;
      } else if (v.length > 2) {
        res = `${v.slice(0,2)}/${v.slice(2)}`;
      } else {
        res = v;
      }
      e.target.value = res;
      clearError('error-nascimento');
    });
  }

  // Máscara de Moeda (Valor): X.XXX,XX
  const inputValor = document.getElementById('q-valor');
  if (inputValor) {
    inputValor.addEventListener('input', (e) => {
      let v = e.target.value.replace(/\D/g, '');
      if (!v) {
        e.target.value = '';
        return;
      }
      
      // Remover zeros à esquerda extras
      v = parseInt(v, 10).toString();
      while (v.length < 3) {
        v = '0' + v;
      }

      const intPart = v.slice(0, v.length - 2);
      const decPart = v.slice(v.length - 2);
      const formattedInt = intPart.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
      
      e.target.value = `${formattedInt},${decPart}`;
      clearError('error-valor');
    });
  }

  // ==========================================
  // REGRAS DE VALIDAÇÃO E FLUXO DOS BOTÕES
  // ==========================================

  // Tratar botões de opções (Sim / Não)
  document.querySelectorAll('.q-btn-option').forEach(btn => {
    btn.addEventListener('click', () => {
      const stepEl = btn.closest('.q-step');
      const stepNum = parseInt(stepEl.getAttribute('data-step'), 10);
      const answer = btn.getAttribute('data-answer'); // 'sim' ou 'nao'

      if (stepNum === 1) { // CLT
        if (answer === 'nao') {
          showScreen('restrictive');
        } else {
          answers.clt = 'Sim';
          goToStep(2);
        }
      } else if (stepNum === 7) { // Empresa > 2 anos
        if (answer === 'nao') {
          showScreen('restrictive');
        } else {
          answers.empresaMais2Anos = 'Sim';
          goToStep(8);
        }
      } else if (stepNum === 8) { // Margem Disponível
        if (answer === 'nao') {
          showScreen('restrictive');
        } else {
          answers.margemDisponivel = 'Sim';
          goToStep(9);
        }
      }
    });
  });

  // Validação da Data de Nascimento (Mínimo 18 anos)
  function validateBirthDate(dateStr) {
    // Formato esperado: DD/MM/AAAA
    if (dateStr.length < 10) return { valid: false, msg: 'Preencha a data completa (DD/MM/AAAA)' };

    const parts = dateStr.split('/');
    const day = parseInt(parts[0], 10);
    const month = parseInt(parts[1], 10);
    const year = parseInt(parts[2], 10);

    // Validações básicas de calendário
    if (day < 1 || day > 31 || month < 1 || month > 12 || year < 1900) {
      return { valid: false, msg: 'Data de nascimento inválida' };
    }

    const birthDate = new Date(year, month - 1, day);
    const today = new Date();

    // Validar se a data gerada confere com os inputs (ex: 30/02 viraria março no JS padrão)
    if (birthDate.getDate() !== day || birthDate.getMonth() !== month - 1) {
      return { valid: false, msg: 'Data inexistente no calendário' };
    }

    // Validar não estar no futuro
    if (birthDate > today) {
      return { valid: false, msg: 'A data não pode estar no futuro' };
    }

    // Cálculo exato de idade
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }

    if (age < 18) {
      return { valid: false, msg: 'É necessário ter no mínimo 18 anos para simular' };
    }

    return { valid: true };
  }

  // Tratar botões de avançar nos inputs de texto
  document.querySelectorAll('.q-step .q-btn-next').forEach(btn => {
    btn.addEventListener('click', () => {
      const stepEl = btn.closest('.q-step');
      const stepNum = parseInt(stepEl.getAttribute('data-step'), 10);

      if (stepNum === 2) { // Nome Completo
        const val = document.getElementById('q-nome').value.trim();
        if (!val || val.split(' ').length < 2) {
          showError('error-nome', 'Por favor, insira seu nome completo');
          return;
        }
        answers.nome = val;
        goToStep(3);
      } 
      else if (stepNum === 3) { // CPF
        const val = document.getElementById('q-cpf').value.trim();
        if (val.length < 14) {
          showError('error-cpf', 'Insira um CPF válido com 11 dígitos');
          return;
        }
        answers.cpf = val;
        goToStep(4);
      }
      else if (stepNum === 4) { // WhatsApp
        const val = document.getElementById('q-whatsapp').value.trim();
        if (val.length < 14) {
          showError('error-whatsapp', 'Insira um número de telefone com DDD válido');
          return;
        }
        answers.whatsapp = val;
        goToStep(5);
      }
      else if (stepNum === 5) { // E-mail
        const val = document.getElementById('q-email').value.trim();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(val)) {
          showError('error-email', 'Insira um endereço de e-mail válido');
          return;
        }
        answers.email = val;
        goToStep(6);
      }
      else if (stepNum === 6) { // Data de Nascimento
        const val = document.getElementById('q-nascimento').value.trim();
        const validation = validateBirthDate(val);
        if (!validation.valid) {
          showError('error-nascimento', validation.msg);
          return;
        }
        answers.nascimento = val;
        goToStep(7);
      }
    });
  });

  // Concluir fluxo final (Passo 9)
  const btnFinish = document.getElementById('btn-finish-flow');
  if (btnFinish) {
    btnFinish.addEventListener('click', () => {
      const val = document.getElementById('q-valor').value.trim();
      if (!val || val === '0,00') {
        showError('error-valor', 'Insira um valor válido para simular');
        return;
      }
      answers.valor = val;
      
      // Concluiu todos os 9 passos satisfazendo todos os critérios com sucesso!
      showScreen('success');
    });
  }

  // Permitir submissão rápida com a tecla Enter em todos os inputs
  document.querySelectorAll('.q-step input').forEach(input => {
    input.addEventListener('keyup', (e) => {
      if (e.key === 'Enter') {
        const stepEl = input.closest('.q-step');
        const nextBtn = stepEl.querySelector('.q-btn-next') || stepEl.querySelector('.q-btn-finish');
        if (nextBtn) {
          nextBtn.click();
        }
      }
    });
  });

  // Iniciar o progresso do Passo 1
  updateProgress(currentStep);
});
