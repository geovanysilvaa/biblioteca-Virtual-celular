

function addFavoritos(): void {
  // Pega o input do título
  let inputTitulo = document.getElementById('respostatitulo') as HTMLInputElement;
  if (!inputTitulo) {
    mostrarMensagem('Campo de título não encontrado');
    return;
  }

  // Pega o valor, limpa espaços e coloca em minúsculas
  let valorTitulo = inputTitulo.value.trim().toLowerCase();
  if (valorTitulo === '') {
    mostrarMensagem('⚠️ Por favor, digite um título.');
    return;
  }

  // Verifica se o livro já foi adicionado na lista de livros
  let livrosSalvos = localStorage.getItem('livros');
  let livros: string[] = livrosSalvos ? JSON.parse(livrosSalvos) : [];

  if (livros.indexOf(valorTitulo) === -1) {
    mostrarMensagem('❌ Este livro não está na lista de livros cadastrados.');
    return;
  }

  // Verifica se já está nos favoritos
  let favoritosSalvos = localStorage.getItem('favoritos');
  let favoritos: string[] = favoritosSalvos ? JSON.parse(favoritosSalvos) : [];

  if (favoritos.indexOf(valorTitulo) !== -1) {
    mostrarMensagem('⚠️ Este livro já está nos favoritos.');
    return;
  }

  // Adiciona aos favoritos e salva
  favoritos.push(valorTitulo);
  localStorage.setItem('favoritos', JSON.stringify(favoritos));
  mostrarMensagem('⭐ Livro adicionado aos favoritos!');

  // Limpa o campo
  inputTitulo.value = '';
}


// armazena títulos
let armazenatitulos: Array<string> = [
  'bird box',
  'as cronicas de narnia',
  'como eu era antes de voce',
  'o jogo do exterminador',
  'a menina que roubava livros',
  'as aventuras de tom sawyer'
];

// carrega livros do localStorage ou inicia vazio
let livros: Array<string> = JSON.parse(localStorage.getItem('livros') || '[]');

//funcao auxiliar para mostrar mensagens tela
function mostrarMensagem(texto:string,cor:string='black'):void{
let div = document.getElementById('mensagem');
if(div){
div.innerText = texto;
div.style.color = cor;
div.style.marginTop = '10px';
}
}

// função 01. adiciona livros no array livros e salva no localStorage
function adicionarlivros():void {
  // pega o elemento input
  let inputTitulo = document.getElementById('respostatitulo') as HTMLInputElement;
  if (!inputTitulo) {
    mostrarMensagem('Campo de título não encontrado');
    return;
  }

  // pega o valor, limpa espaços e coloca em minúsculas
  let valorTitulo = inputTitulo.value.trim().toLowerCase();
  if (valorTitulo === '') {
    mostrarMensagem('⚠️ Por favor, digite um título.');
    return;
  }

  // verifica se está na lista permitida
  let jaExiste = false;
  for (let i = 0; i < armazenatitulos.length; i++) {
    if (armazenatitulos[i].toLowerCase() === valorTitulo) {
      jaExiste = true;
    }
  }
  if (!jaExiste) {
    mostrarMensagem('❌ Esse Livro Não Está Adicionado À Lista');
    return;
  }

  // verifica se já foi cadastrado
  let jaCadastrado = false;
  for (let i = 0; i < livros.length; i++) {
    if (livros[i] === valorTitulo) {
      jaCadastrado = true;
    }
  }
  if (jaCadastrado) {
    mostrarMensagem('⚠️ Livro já está cadastrado');
    return;
  }

  // adiciona e salva
  livros.push(valorTitulo);
  localStorage.setItem('livros', JSON.stringify(livros));
  mostrarMensagem('✅ Livro Adicionado Com Sucesso');
  
  // limpa o campo
  inputTitulo.value = '';
}


function mostrarLista(): void {
  let divLista = document.getElementById('listaLivros');
  if (!divLista) return;

  // Pegando livros cadastrados
  let livrosJSON = localStorage.getItem('livros');
  let livros: string[] = livrosJSON ? JSON.parse(livrosJSON) : [];

  // Pegando favoritos
  let favoritosJSON = localStorage.getItem('favoritos');
  let favoritos: string[] = favoritosJSON ? JSON.parse(favoritosJSON) : [];

  // Mensagem se nenhum estiver cadastrado
  if (livros.length === 0 && favoritos.length === 0) {
    divLista.innerHTML = "Nenhum livro ou favorito cadastrado.";
    return;
  }

  // Construir lista dos livros
  let html = '';

  if (livros.length > 0) {
    html += '<h3>📚 Livros Cadastrados</h3><ul>';
    livros.forEach((livro) => {
      html += `<li>${livro}</li>`;
    });
    html += '</ul>';
  } else {
    html += '<p>⚠️ Nenhum livro cadastrado.</p>';
  }

  // Construir lista dos favoritos
  if (favoritos.length > 0) {
    html += '<h3>⭐ Livros Favoritos</h3><ul>';
    favoritos.forEach((livro) => {
      html += `<li>${livro}</li>`;
    });
    html += '</ul>';
  } else {
    html += '<p>⚠️ Nenhum favorito cadastrado.</p>';
  }

  // Mostra tudo na tela
  divLista.innerHTML = html;
}


// Espera o DOM carregar pra garantir que o botão existe
document.addEventListener('DOMContentLoaded', () => {
  const btnMostrarLista = document.getElementById('mostrarLista');
  if (btnMostrarLista) {
    btnMostrarLista.addEventListener('click', mostrarLista);
  }
});

// Função para abrir o livro em PDF na nova aba
function abrirLivro(): void {
  let input = document.getElementById('tituloLivro') as HTMLInputElement;
  let titulo = input.value.trim();

  if (titulo === '') {
    mostrarMensagem('Por favor, digite o título do livro.');
    return;
  }

  let livrosJSON = localStorage.getItem('livros');

  if (!livrosJSON) {
    mostrarMensagem('Nenhum livro cadastrado.');
    return;
  }

  let livros: string[] = JSON.parse(livrosJSON);

  let livroExiste = livros.some(l => l.toLowerCase() === titulo.toLowerCase());

  if (!livroExiste) {
    mostrarMensagem('Livro não encontrado.');
    return;
  }

  mostrarMensagem('Abrindo livro...', 'green');

  const nomeArquivo = titulo.toLowerCase().replace(/\s+/g, '-');
  const caminhoPDF = `pdf/${nomeArquivo}.pdf`;

  window.open(caminhoPDF, '_blank');
}

// Adiciona evento ao botão após carregar a página
document.addEventListener('DOMContentLoaded', () => {
  const btnAbrir = document.getElementById('abrirLivros');
  if (btnAbrir) {
    btnAbrir.addEventListener('click', abrirLivro);
  }
});

function apagarLivro(): void {
  const input = document.getElementById('titulolivror') as HTMLInputElement | null;
  if (!input) {
    mostrarMensagem("Erro: campo para digitar título não encontrado.");
    return;
  }

  const tituloParaApagar = input.value.trim();
  if (!tituloParaApagar) {
    mostrarMensagem("Por favor, digite o título do livro para apagar.");
    return;
  }

  const livrosJSON = localStorage.getItem('livros');
  if (!livrosJSON) {
    mostrarMensagem("Nenhum livro salvo para apagar.");
    return;
  }

  let livros: string[] = JSON.parse(livrosJSON);
  const index = livros.findIndex(titulo => titulo.toLowerCase() === tituloParaApagar.toLowerCase());

  if (index === -1) {
    mostrarMensagem("Livro não encontrado.");
    return;
  }

  livros.splice(index, 1);
  localStorage.setItem('livros', JSON.stringify(livros));
  mostrarMensagem(`Livro "${tituloParaApagar}" \n removido com sucesso!`);
  input.value = '';
  mostrarLista();
}

document.addEventListener('DOMContentLoaded', () => {
  let btnMostrarLista = document.getElementById('mostrarListaParaRemover');

  if(btnMostrarLista){
  btnMostrarLista.addEventListener('click',mostrarLista);
  }
  let btnApagarLivro=document.getElementById('apagarLivro');
  if(btnApagarLivro){
  btnApagarLivro.addEventListener('click',apagarLivro);
  }
});

function apagarFavorito(): void {
  const input = document.getElementById('titulolivror') as HTMLInputElement | null;
  if (!input) {
    mostrarMensagem("Erro: campo para digitar título não encontrado.");
    return;
  }

  const tituloParaApagar = input.value.trim();
  if (!tituloParaApagar) {
    mostrarMensagem("Por favor, digite o título do favorito para apagar.");
    return;
  }

  const favoritosJSON = localStorage.getItem('favoritos');
  if (!favoritosJSON) {
    mostrarMensagem("Nenhum favorito salvo para apagar.");
    return;
  }

  let favoritos: string[] = JSON.parse(favoritosJSON);
  const index = favoritos.findIndex(titulo => titulo.toLowerCase() === tituloParaApagar.toLowerCase());

  if (index === -1) {
    mostrarMensagem("Livro favorito não encontrado.");
    return;
  }

  favoritos.splice(index, 1);
  localStorage.setItem('favoritos', JSON.stringify(favoritos));
  mostrarMensagem(`Livro "${tituloParaApagar}" removido dos favoritos com sucesso!`);
  input.value = '';
  mostrarLista(); // Atualiza a exibição da lista, se você estiver usando ela
}
let btnApagarFavorito = document.getElementById('apagarFavorito');
if (btnApagarFavorito) {
  btnApagarFavorito.addEventListener('click', apagarFavorito);
}
