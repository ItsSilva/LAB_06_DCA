import { getProducts } from "../utils/firebase";

export class Song extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.render();
    }

    async updateSongs() {
        if(this.shadowRoot) {
            this.shadowRoot.innerHTML = '';
            await this.render();
        }
    }

    formatDate(dateString: string) {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    }

    async render() {
        const styles = `
            :host {
                display: block;
                padding: 20px 0;
            }

            .song-list {
                display: flex;
                flex-direction: column;
                gap: 8px;
            }

            .song-item {
                display: grid;
                grid-template-columns: 40px 3fr 2fr 1fr 1fr 1fr;
                align-items: center;
                padding: 8px 16px;
                background-color: #282828;
                border-radius: 4px;
                transition: background-color 0.2s;
            }

            .song-item:hover {
                background-color: #333333;
            }

            .song-image {
                width: 40px;
                height: 40px;
                border-radius: 4px;
                object-fit: cover;
            }

            .song-info {
                display: flex;
                flex-direction: column;
                gap: 4px;
            }

            .song-name {
                font-size: 16px;
                font-weight: 500;
                color: #fff;
                margin: 0;
            }

            .song-artist {
                font-size: 14px;
                color: #909090;
                margin: 0;
            }

            .song-album {
                font-size: 14px;
                color: #909090;
                margin: 0;
            }

            .song-date, .song-added {
                font-size: 14px;
                color: #909090;
                margin: 0;
            }

            .song-duration {
                font-size: 14px;
                color: #909090;
                margin: 0;
                text-align: right;
            }
        `;

        const styleSheet = this.ownerDocument.createElement('style');
        styleSheet.textContent = styles;
        this.shadowRoot?.appendChild(styleSheet);

        const songList = this.ownerDocument.createElement('div');
        songList.className = 'song-list';

        const products = await getProducts();
        products?.forEach((product: any) => {
            const songItem = this.ownerDocument.createElement('div');
            songItem.className = 'song-item';
            songItem.innerHTML = `
                <img class="song-image" src="${product.image}" alt="${product.name}">
                <div class="song-info">
                    <h2 class="song-name">${product.name}</h2>
                    <h3 class="song-artist">${product.artist}</h3>
                </div>
                <h3 class="song-album">${product.album}</h3>
                <h3 class="song-date">${product.date}</h3>
                <h3 class="song-duration">${product.duration}</h3>
                <h3 class="song-added">${product.addedAt ? this.formatDate(product.addedAt) : 'N/A'}</h3>
            `;
            songList.appendChild(songItem);
        });

        this.shadowRoot?.appendChild(songList);
    }
}

customElements.define('song-component', Song);
export default Song;