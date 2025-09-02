const express = require('express')
const app = express()
const port = 3000

app.use(express.json())

var alunos = [
    {ra: "123", nome: "João", turma: "DSM", cursos: ["JavaScript", "C++"]}, 
    {ra: "321", nome: "Leonardo", turma: "ADS", cursos: ["Engenharia de Software", "Des. Web"]}, 
    {ra: "345", nome: "Isabella", turma: "DSM", cursos: ["Python", "BD"]},
    
]



// first endpoint
 
app.post('/', (req, res) => {
  alunos.push({"ra": req.body.ra, "nome": req.body.nome, "turma": req.body.turma, "cursos": []})
  res.send(alunos)
})

app.post('/addcurso', (req, res) => {
  const index = alunos.findIndex(x => x.ra == req.query.ra);
  alunos[index].cursos.push(req.body.cursos)
  res.send(alunos)
})

app.put('/', (req, res) => {
    const index = alunos.findIndex(x => x.ra == req.query.ra);
    alunos[index] = {"ra": req.query.ra, "nome": req.body.nome, "turma": req.body.turma, "cursos": alunos[index].cursos}
    res.send(JSON.stringify(alunos))
})

app.put('/updatecurso', (req, res) => {
    const index = alunos.findIndex(x => x.ra == req.query.ra);
    alunos[index].cursos = req.body.cursos
    res.send(JSON.stringify(alunos))
})

app.delete('/', (req, res) => {
  const index = alunos.findIndex(x => x.ra == req.query.ra);
  alunos.splice(index, 1);
  res.send(JSON.stringify(alunos))
})

app.delete('/deletecurso', (req, res) => {
  const ra = alunos.findIndex(x => x.ra == req.query.ra);
  const indexCurso = alunos.findIndex(y => y.cursos == req.query.cursos)
  alunos[ra].cursos.splice(indexCurso, 1);
  res.send(JSON.stringify(alunos))
})

app.get('/', (req, res) => {
  res.send(JSON.stringify(alunos))
})

app.get('/getone', (req, res) => {
  const index = alunos.findIndex(x => x.ra == req.query.ra);
  res.send(JSON.stringify(alunos[index]))
})


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})