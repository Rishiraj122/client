import React from "react";

function Header(){
    return <>
    <nav class="sticky-top navbar navbar-expand-lg navbar-dark">
    <a class="navbar-brand" href="/"><i class="nav-icon fas fa-building fa-1x"></i> HMS</a>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav ml-auto">
            <li class="nav-item">
                <a class="nav-link" href="/">Home</a>
            </li>
        </ul>
    </div>
</nav>
    </>
}

export default Header;