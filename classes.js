export class Room{
    constructor(room_id, size){
        this.roomId = room_id;
        this.posts = []

    }

    //retreives the room data
    getRoom(){
        this.sort()
        return {id: this.roomId,
                size: this.size,
                posts: this.posts}
    }

    //removes the lowest post and replaces it with the new
    //only if the new has higher endorsments
    //returns true if succefull and false if it fails
    addPost(post){
        this.posts.push( post)
        return true;
        
    }

    //sorts the posts
    sort(){
        this.posts.sort((a, b) => b.sanad.length - a.sanad.length)
    }
}

export class Post{
    constructor(sayer, message){
        this.sayer = sayer;
        this.sanad = [sayer]
        this.message = message
    }

    retell(retller, retelling){
        this.message = retelling;
        if(this.sanad[this.sanad.length-1].id != retller.id)
            this.sanad.push(retller);
    }

    vote(votes){
        this.votes = votes;
    }

    getSanad(){
        if(this.sanad[0] == null)
            return ''
        let ids = []
        this.sanad.forEach((elt)=> ids.push(elt.id))
        let sanad_string = ids.shift()
        ids.forEach((id) => sanad_string = sanad_string + ' who told '  + id)
        sanad_string = sanad_string + ' has said: '

        return sanad_string
    }

    getHTML(){
        let sanad_div = document.createElement('div')
        sanad_div.className = 'post'


        let sanad = document.createElement('p')
        sanad.className = 'sanad'
        sanad.innerText= this.getSanad()

        sanad_div.append(sanad)


        let post_div = document.createElement('div')
        post_div.className = 'post'

        let saying = document.createElement('p')
        saying.className = 'saying'
        saying.innerText = this.message

        post_div.append(saying)

        sanad_div.append(post_div)
        return sanad_div
    }

    getHTMLForm(){
        let sanad_div = document.createElement('div')
        sanad_div.className = 'post'


        let sanad = document.createElement('p')
        sanad.className = 'sanad'
        sanad.innerText= this.getSanad()

        sanad_div.append(sanad)


        let post_div = document.createElement('form')
        post_div.className = 'post_form post'

        let saying = document.createElement('textarea')
        saying.className = 'saying'
        saying.innerText = this.message
        saying.id= 'newsay'

        post_div.append(saying)

        sanad_div.append(post_div)

        let submit_button = document.createElement('button')
        submit_button.innerHTML = 'say it to somebody'
        submit_button.id = 'submit_button'

        sanad_div.append(submit_button)

        return sanad_div
    }

}

export class Voter{
    constructor(id, power){
        this.id = id
        this.power = power
        this.posts = new Array(power)
        for(let i = 0; i<power; i++){
            this.posts[i] = new Post(this, 'No saying is etched here yet')
        }
    }

    say(id, message){
        this.posts[id] = new Post(this, message)
    }

    rephrase(index, message){
        this.posts[index].retell(this, message)
    }

    carry(index, post){
        this.posts[index] = post
    }

    getPost(id){
        return this.posts[id]
    }
}