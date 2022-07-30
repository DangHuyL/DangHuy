/**
 * 1.Render song
 * 2.Scroll top
 * 3. play/ pause / seek
 * 4. CD rotate
 * 5. Next /pre
 * 6. Random
 * 7. Next / Repeat when ended
 * 8. Active song
 * 9. Scroll active song into view
 * 10. play song when click
 */

const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)


const playList = $('.playlist')
const cd = $('.cd')
const playBtn = $('.btn-toggle-play')
const audio = $('#audio')
const player = $('.player')
const heading = $('header h2')
const cdThumb = $('.cd-thumb')
const progress = $('.progress')
const nextBtn = $('.btn-next')
const prevBtn = $('.btn-prev')
const randomBtn = $('.btn-random')
const repeatBtn = $('.btn-repeat')

const apps = {
    isplaying: false,
    currentIndex: 0,
    isRandom: false,
    isRepeat: false,
    songs: [
        {
            name: 'Haru Haru',
            singel:'BigBang',
            path: './assets/music/song_1.mp3',
            image: './assets/img/song_1.jpg'
        },
        {
            name: 'Tiêng gọi',
            singel:'Bức tường',
            path: './assets/music/song_2.mp3',
            image: './assets/img/song_2.jpg'
        },
        {
            name: 'Bảng tình ca tháng 5',
            singel:'Bức tường',
            path: './assets/music/song_3.mp3',
            image: './assets/img/song_3.jpg'
        },
        {
            name: 'Chạy về nơi phía anh',
            singel:'Khắc Việt',
            path: './assets/music/song_4.mp3',
            image: './assets/img/song_4.jpg'
        },
        {
            name: 'Em là cô dâu đẹp nhấp',
            singel:'Châu Khải Phong',
            path: './assets/music/song_5.mp3',
            image: './assets/img/song_5.jpg'
        },
        {
            name: 'Ánh nắng của anh',
            singel:'Đức Phúc',
            path: './assets/music/song_6.mp3',
            image: './assets/img/song_6.jpg'
        },
        {
            name: 'Cũng đành thôi',
            singel:'Đức phúc',
            path: './assets/music/song_7.mp3',
            image: './assets/img/song_7.jpg'
        },
        {
            name: 'Loser',
            singel:'Big Bang',
            path: './assets/music/song_8.mp3',
            image: './assets/img/song_8.jpg'
        },
        {
            name: 'See you again',
            singel:'Wiz Khalifa',
            path: './assets/music/song_9.mp3',
            image: './assets/img/song_9.jpg'
        },
        {
            name: 'Tình yêu xanh lá',
            singel:'Thịnh Suy',
            path: './assets/music/song_10.mp3',
            image: './assets/img/song_10.jpg'
        }
    ],
    render: function() {
        const htmls = this.songs.map((song, index) => {
            return `
            <div class="song ${index === this.currentIndex ? 'active' : ''}" data-index = "${index}">
                <div class="thumb" style="background-image: url(${song.image});">   
                </div>
                <div class="body">
                    <h3 class="title">${song.name}</h3>
                    <p class="author">${song.singel}</p>
                </div>
                <div class="option">
                    <i class="fas fa-ellipsis-h"></i>
                </div>
            </div>      
            `
        })
        playList.innerHTML = htmls.join('')
    },
    defineProperties: function() {
        Object.defineProperty(this, 'currentsong', {
            get: function() {
                return this.songs[this.currentIndex]
            }
        })
    },
    handlEvents: function() {
        const CdWidth = cd.offsetWidth
        const _this = this
        // Xử lý CD quay 
        const cdThumbAnimate = cdThumb.animate({
            transform: 'rotate(360deg)',
            duration: 10000,
            iterations: Infinity
        })
        cdThumbAnimate.pause()

        // Xử lý phóng to thu nhỏ CD
        document.onscroll = function() {
            const scrollTop = window.scrollY
            console.log(scrollTop)
            const newWidth = CdWidth - scrollTop
            cd.style.width = newWidth > 0 ? newWidth + 'px' : 0;
            cd.style.opacity = newWidth / CdWidth
        }
        // Xử lý khi được clickplay 
        playBtn.onclick = function() {
            if(_this.isplaying) {
                audio.pause()
            }
            else {
                audio.play()
            }
        }
        // Khi song đƯợc play 
        audio.onplay = function() {
            _this.isplaying = true
            player.classList.add('playing')
            cdThumbAnimate.play()
        }
         // Khi song đƯợc pause 
         audio.onpause = function() {
            _this.isplaying = false
            player.classList.remove('playing')
            cdThumbAnimate.pause()
        }
        // Khi tiến độ bài hát được thay đổi
        audio.ontimeupdate = function() {
           if(audio.duration) {
               const progressPercent = Math.floor(audio.currentTime * 100 / audio.duration)
               progress.value = progressPercent
               console.log(progressPercent)
           }
        }
        // Xử lý khi tua
        progress.onchange = function(e) {
            const seekTime = e.target.value * audio.duration / 100
            audio.currentTime = seekTime
        }
        // Xử lý khi next 
        nextBtn.onclick = function() {
            if(_this.isRandom) {
                _this.playRandomSong()
            }
            else {
                _this.nextBtn()
               
            }
            audio.play()
            _this.render()
            _this.scrollToActiveSong()
           
        }
        // Xử lý khi prev
        prevBtn.onclick = function() {
            if(_this.isRandom) {
                _this.playRandomSong()
            }
            else {
                _this.prevBtn()
            }
            audio.play()
            _this.render()
            _this.scrollToActiveSong()
        }
        // Xử lý khi có random
        randomBtn.onclick = function() {
            _this.isRandom = !_this.isRandom
            randomBtn.classList.toggle('active',_this.randomBtn)
        }
        // Xử lý khi có repeat
        repeatBtn.onclick = function() {
            _this.isRepeat = !_this.isRepeat 
            repeatBtn.classList.toggle('active', _this.isRepeat)
        }
        // xỬ lý khi next song lặp lại 
        audio.onended = function() {
            if(_this.isRepeat) {
                audio.play()
            }
            else {
                nextBtn.click()
            }
        }
        // Lắng nghe hanh vi khi click vào playlist
        playList.onclick = function(e) {
            const songNode = e.target.closest('.song:not(.active)')
            if(songNode || e.target.closest('.option')) {
                // Xử lý click vào song
                if(songNode) {
                    _this.currentIndex = Number(songNode.dataset.index)
                    _this.loadCurrentSong()
                    _this.render()
                    audio.play()
                }
                // Xử lý click vào option
                if(e.targer.closest('.option')) {
                    alert("Xin chao cac ban")
                }
            }
            else {

            }
        }
    },
    nextBtn: function() {
        this.currentIndex ++;
        if(this.currentIndex >= this.songs.length) {
            this.currentIndex = 0;
        }
        this.loadCurrentSong()
    },
    prevBtn: function() {
        this.currentIndex--;
        if(this.currentIndex < 0) {
            this.currentIndex = this.songs.length - 1
        }
        this.loadCurrentSong()
    },   
    
    loadCurrentSong: function() {
        heading.textContent = this.currentsong.name
        cdThumb.style.backgroundImage = `url('${this.currentsong.image}')`
        audio.src = this.currentsong.path
    },
    scrollToActiveSong: function() {
        setTimeout(() =>{
            $('.song.active').scrollIntoView({
                behavior: 'smooth',
                block: 'nearest'

            })
        },500)
    },
    playRandomSong: function() {
        let newIndex
        do {
            newIndex = Math.floor(Math.random() * this.songs.length)
        }
        while(newIndex === this.currentIndex)
        this.currentIndex = newIndex
        this.loadCurrentSong()
    },
    start: function()  {
        // Định nghĩa các thuộc tính cho object 
        this.defineProperties()

        // Render playlist
        this.render()

        // Tải thông tin bài hát đâu tiên vào UI
        this.loadCurrentSong()

        // Lắng nghe và xử lý các sự kiện
        this.handlEvents()
    }
}

apps.start()