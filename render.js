import { Mongoose } from 'mongoose';
import './classes.js';
import { Post, Room, Voter } from './classes.js';


let g_post = {}

export function topWindow(room){
    let window = document.createElement('div')
    window.className = 'community window'

    let header = document.createElement('div')
    header.className = 'header'
    header.append('The next person')
    window.append(header)

    window.append(room.posts[0].getHTML())

    



    return window
}

export async function controlWindow(){
    let window = document.createElement('div')
    window.className = 'court window'

    let header = document.createElement('div')
    header.className = 'header'
    header.append('Stuff')
    window.append(header)

    let buttons = document.createElement('div')
    buttons.className = 'control'

    let get_button = document.createElement('button')
    get_button.innerText = 'Get a new saying'
    get_button.id = 'get_button'
    buttons.append(get_button)


    let create_button = document.createElement('button')
    create_button.innerText = 'create a saying'
    create_button.id = 'create_button'
    buttons.append(create_button)

    let quote_button = document.createElement('button')
    quote_button.innerHTML = 'Say a random quote'
    quote_button.id = 'quote_button'
    buttons.append(quote_button)

    const xkcd_json = await axios({
        method: 'GET',
        url: 'https://xkcd.vercel.app/?comic=latest',
    })

    let xkcd = xkcd_json.data

    let comic_div = document.createElement('div')
    comic_div.className = 'comic'

    let comic_title = document.createElement('h1')
    comic_title.innerText = xkcd.safe_title
    comic_div.append(comic_title)


    let comic = document.createElement('img')
    comic.src = xkcd.img
    comic_div.append(comic)


    let alt = document.createElement('p')
    alt.innerText = xkcd.alt

    comic_div.append(alt)



    window.append(buttons)
    window.append(comic_div)
    return window

}
export function voterWindow(voter){
    let window = document.createElement('div')
    window.className = 'voter window'

    let header = document.createElement('div')
    header.className = 'header'
    header.append('Your stuff')
    window.append(header)


   

    let empty_post = new Post(voter, '')
    g_post = empty_post
    window.append(empty_post.getHTMLForm())




    return window
}

export async function handle_submit(){
    let form = $('#newsay')
    g_post.message = form.innerText

    await axios({
        method: 'post'
    })

    render()
}

export async function render(){
    let $root = $('#root')
    $root.empty()

    //Debug code delete later
    let room = new Room(0,3)
    let voter = new Voter('Yazid', 3)
    let another = new Voter('jack', 2)
    voter.say(0, 'first message')
    voter.getPost(0).vote(13)
    room.addPost(voter.getPost(0))

    another.say(0, 'a retell!')
    voter.carry(0, another.getPost(0))
    voter.rephrase(0, 'my retell')
    voter.getPost(0).vote(15)
    room.addPost(voter.getPost(0))

    

    //delete to here
    $root.append(topWindow(room.getRoom()))
    $root.append(voterWindow(voter))
    $root.append(await controlWindow())

    $root.on('click', '#submit_button', handle_submit)
}


$(function(){
    render();
})