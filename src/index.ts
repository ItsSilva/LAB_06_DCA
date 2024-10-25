import { addProduct } from './utils/firebase';
import Song from './components/Song';
import './components/Song';

const product = {
    name: 'Music product name',
    artist: 'Music product artist',
    album: 'Music product album',
    date: 'Music product date',
    duration: 'Music product duration',
    image: '',
    addedAt: ''
}

class AppContainer extends HTMLElement {
    private songComponent?: Song;

    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.render();
    }

    changeImage(e: any) {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onloadend = () => {
            product.image = reader.result as string;
        };
        if (file) {
            reader.readAsDataURL(file);
        };
    }

    changeName(e: any) {
        product.name = e.target.value;
    }

    changeArtist(e: any) {
        product.artist = e.target.value;
    }

    changeAlbum(e: any) {
        product.album = e.target.value;
    }

    changeDate(e: any) {
        product.date = e.target.value;
    }

    changeDuration(e: any) {
        product.duration = e.target.value;
    }

    async submitForm() {
        product.addedAt = new Date().toISOString();
        await addProduct(product);
        if (this.songComponent) {
            await this.songComponent.updateSongs();
        }
    }

    render() {
        if (this.shadowRoot) {
            const styles = `
                :host {
                    display: block;
                    background-color: #121212;
                    color: #ffffff;
                    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
                    padding: 20px;
                    min-height: 100vh;
                    margin: 0;
                }

                section {
                    max-width: 800px;
                    margin: 0 auto;
                }

                h1 {
                    font-size: 28px;
                    margin-bottom: 30px;
                    color: #fff;
                }

                input {
                    display: block;
                    width: 100%;
                    padding: 12px;
                    margin-bottom: 15px;
                    background-color: #282828;
                    border: 1px solid #404040;
                    border-radius: 4px;
                    color: #fff;
                    font-size: 14px;
                }

                input::placeholder {
                    color: #909090;
                }

                input[type="file"] {
                    padding: 8px;
                }

                input[type="date"] {
                    color: #909090;
                }

                button {
                    background-color: #4c6ef5;
                    color: white;
                    padding: 12px 24px;
                    border: none;
                    border-radius: 20px;
                    font-size: 14px;
                    font-weight: 600;
                    cursor: pointer;
                    transition: background-color 0.2s;
                }

                button:hover {
                    background-color: #4263eb;
                }
            `;

            const styleSheet = this.ownerDocument.createElement('style');
            styleSheet.textContent = styles;
            this.shadowRoot.appendChild(styleSheet);

            const formContainer = this.ownerDocument.createElement('section');

            const h1 = this.ownerDocument.createElement('h1');
            h1.innerHTML = 'Form to add a music product';
            formContainer.appendChild(h1);

            const pImage = this.ownerDocument.createElement('input');
            pImage.setAttribute('type', 'file');
            pImage.setAttribute('accept', 'image/*');
            pImage.setAttribute('required', 'true');
            pImage.addEventListener('change', this.changeImage);
            formContainer.appendChild(pImage);

            const pName = this.ownerDocument.createElement('input');
            pName.setAttribute('type', 'text');
            pName.setAttribute('placeholder', 'Music product name');
            pName.setAttribute('required', 'true');
            pName.addEventListener('change', this.changeName);
            formContainer.appendChild(pName);

            const pArtist = this.ownerDocument.createElement('input');
            pArtist.setAttribute('type', 'text');
            pArtist.setAttribute('placeholder', 'Music product artist');
            pArtist.setAttribute('required', 'true');
            pArtist.addEventListener('change', this.changeArtist);
            formContainer.appendChild(pArtist);

            const pAlbum = this.ownerDocument.createElement('input');
            pAlbum.setAttribute('type', 'text');
            pAlbum.setAttribute('placeholder', 'Music product album');
            pAlbum.setAttribute('required', 'true');
            pAlbum.addEventListener('change', this.changeAlbum);
            formContainer.appendChild(pAlbum);

            const pDate = this.ownerDocument.createElement('input');
            pDate.setAttribute('type', 'date');
            pDate.setAttribute('required', 'true');
            pDate.addEventListener('change', this.changeDate);
            formContainer.appendChild(pDate);

            const pDuration = this.ownerDocument.createElement('input');
            pDuration.setAttribute('type', 'text');
            pDuration.setAttribute('placeholder', 'Duration (e.g. 3:45)');
            pDuration.setAttribute('required', 'true');
            pDuration.addEventListener('change', this.changeDuration);
            formContainer.appendChild(pDuration);

            const save = this.ownerDocument.createElement('button');
            save.innerHTML = 'Save music product';
            save.addEventListener('click', this.submitForm.bind(this));
            formContainer.appendChild(save);

            this.shadowRoot.appendChild(formContainer);

            this.songComponent = this.ownerDocument.createElement('song-component') as Song;
            this.shadowRoot.appendChild(this.songComponent);
        }
    }
}

customElements.define('app-container', AppContainer);