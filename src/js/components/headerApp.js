import salad from '../../img/salad.png';
import logo from '../../img/logo2.jpg';

class HeaderApp extends HTMLElement {
    connectedCallback() {
        this.render();
    }

    render() {
        this.innerHTML = `
        <nav id="navbar" class="navbar transparent navbar-expand-lg navbar-dark">
            <a class="navbar-brand" href="#">
            <img src=${logo} class="d-inline-block align-top logo" alt="logo.jpg">
                <span>Sahabat Bunda</span>
            </a>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav"
            aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation"><i class="fas fa-bars"></i></button>
            <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav ml-auto clear navy">
                    <li class="nav-item homenav">
                        <a class="nav-link">Home <span class="sr-only">(current)</span></a>
                    </li>
                    <li class="nav-item searchnav">
                        <a class="nav-link">Search Result <span class="sr-only">(current)</span></a>
                    </li>
                    <li class="nav-item recipenav">
                        <a class="nav-link">Recipe <span class="sr-only">(current)</span></a>
                    </li>
                    <li class="nav-item shopnav">
                        <a class="nav-link"><i class="fas fa-shopping-cart"></i></a>
                    </li>
                    <li class="nav-item dropdown">
                        <a class="nav-link hati" href=""><i class="fas fa-heart"></i></a>
                        <div class="likes-panel">
                            <ul class="likes-list">
                            </ul>
                        </div>
                    </li>
                </ul>
            </div>
        </nav>

        <div class="mainheader">
            <h1 class="tagline">Find Curated Recipes<br>By Thousand of Recipe Publisher</h1>
            <form class="search">
                <input id="searchfield" class="search-field" type="text" placeholder="&#xf002;      Search over 1,000,000 recipes"
                    aria-label="Search">
            </form>
            <div class="motivation">
                <div class="mot-txt">
                    <h3>Ready to Expand Your Cooking Skills</h3>
                    <p>Even if you think you are hopeless in the kitchen, like everyone else,<br> practice and
                        increasing
                        knowledge make perfects. Search for recipes here<br> read them and become a great chef for your
                        family
                    </p>
                    <button type="button" class="btn btn-light start-btn">Start <i class="fas fa-play-circle"></i></button>
                </div>
                <div class="mot-img">
                    <img src=${salad} alt="salad.png">
                </div>
            </div>
        </div>
        `;
    }
}

customElements.define("header-app", HeaderApp);