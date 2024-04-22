const getPoemBtn = document.getElementById('get-poem');
const poemEl = document.getElementById('poem');
const poemURL = 'https://poetrydb.org/random,linecount/1;12/author,title,lines.json';

const getJSON = url => fetch(url).then(res => res.json());

const makeTag = tag => str => `<${tag}>${str}</${tag}>`;

const makePoemHTML = poem => {
  const titleTag = makeTag('h2');
  const authorTag = makeTag('h3');
  const lineTag = makeTag('p');

  const title = titleTag(poem.title);
  const author = authorTag(poem.author);
  const lines = poem.lines.map(line => lineTag(line)).join('');

  return `${title}${author}${lines}`;
}

getPoemBtn.onclick = async function() {
  try {
    const response = await getJSON(poemURL);
    const poem = response[0]; 
    poemEl.innerHTML = makePoemHTML(poem);
  } catch (error) {
    console.error('Error fetching poem:', error);
    poemEl.innerHTML = 'Sorry, an error occured fetching a poem. Please try again later.';
  }
}
