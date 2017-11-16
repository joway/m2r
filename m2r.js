const options = {
  renderer: new marked.Renderer(),
}

const lexer = new marked.Lexer(options)
const renderer = new marked.Renderer()

const repeat = (char, count) => (Array(count + 1).join(char))
const html2text = (html) => {
  return html.replace(/<[^>]*>/g, '')
}

renderer.code = (text) => (`\n\`\`\` ${text} \`\`\` \n`)
renderer.blockquote = (text) => (`\n> ${text}\n`)
renderer.html = (text) => (text)
renderer.heading = (text, level, raw) => (`\n${repeat('=', level)} ${raw} ${repeat('=', level)} \n`)
renderer.hr = () => ('\n')
renderer.list = (text, ordered) => {
  if (ordered) {
    return _.map(text.split('\n'), s => s.length ? `# ${html2text(s)}` : '').join('\n')
  } else {
    return _.map(text.split('\n'), s => s.length ? `- ${html2text(s)}` : '').join('\n')
  }
}
renderer.paragraph = (text) => {
  return html2text(text)
}
renderer.strong = (text) => (`**${text}**`)
renderer.em = (text) => (`//${text}//`)
renderer.codespan = (text) => (`\`${text}\``)
renderer.br = () => ('\n')
renderer.del = (text) => (`~~${text}~~`)
renderer.link = (href, titile, text) => (`[[${href} | ${text}]]\n`)
renderer.image = (href, titile, text) => (`\n{img ${href}}\n`)
renderer.text = (text) => (text)

function m2r(text) {
  const tokens = lexer.lex(text)
  return marked(text, {
    renderer,
  })
}
