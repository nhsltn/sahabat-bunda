class FooterApp extends HTMLElement {
    connectedCallback() {
        this.render();
    }

    render() {
        this.innerHTML = `
        <div class="row">
            <div class="col-lg-6">
                <ul class="footernav">
                    <li class="foot-nav foothome"><a>Home</a></li>
                    <li class="foot-nav footsearch"><a>Search Results</a></li>
                    <li class="foot-nav footrecipe"><a>Recipe</a></li>
                    <li class="foot-nav footshop"><a>Shopping Cart</a></li>
                </ul>
            </div>
            <div class="col-lg-6">
                <ul class="socialmediafooter">
                    <!-- <li>Follow us on our Social Media</li> -->
                    <li><a href="#"><i class="fab fa-whatsapp"></i></a></li>
                    <li><a href="#"><i class="fab fa-facebook"></i></a></li>
                    <li><a href="#"><i class="fab fa-twitter"></i></a></li>
                    <li><a href="#"><i class="fab fa-instagram"></i></a></li>
                    <li><a href="#"><i class="fab fa-google-plus"></i></a></li>
                    <li><a href="#"><i class="fab fa-linkedin"></i></a></li>
                </ul>
            </div>
        </div>
        <h3>© 2020 Sahabat Bunda All Rights Reserved. nhsulton x dicoding</h3>
        `;
    }
}

customElements.define("footer-app", FooterApp);