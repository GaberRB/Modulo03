const express = require('express')
const nunjucks = require('nunjucks')

const server = express()
const videos = require('./data')

server.use(express.static('public'))

server.set('view engine', 'njk')

nunjucks.configure('views',{
    express: server,
    autoescape:false,
    noCache: true
})


server.get('/', function(req, res){
    const about = {
        url_avatar: "https://avatars2.githubusercontent.com/u/28874479?s=460&u=edd6bbc344a3922b545b770a151a17c0d1a8212b&v=4",
        name: "Gabriel Rios",
        role: "Aluno - RocketSeat",
        description: 'Técnico em desenvolvimento de software, Aluno de desenvolvimento fullstack na <a href="https://rocketseat.com.br/" target="_blank">RocketSeat</a>. Colaborador na <a href="https://consinco.com.br" target="_blank">Consinco by TOTVS</a>.',
        links : [
            {name: "Github",  url: "https://github.com/GaberRB"},
            {name: "Instagram",  url: "https://www.instagram.com/gabrielriosb/"},
            {name: "Linkedin",  url: "https://www.linkedin.com/in/gabriel-riosb/"}
        ]
    }
    return res.render('about', { about })

})

server.get('/portfolio', function(req, res){

    return res.render('portfolio', {items: videos})

})

server.get('/video', function(req, res){
    const id = req.query.id

    const video = videos.find(function(video){
        return video.id == id
    })

    if (!video){
        return res.send('Video não encontrado')
    }

    return res.render('video', { item: video })

    res.send(id)
})

server.listen(5000, function(){
    console.log('server is running')
})