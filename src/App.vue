<template>
  <!-- <nav class="navbar bg-body-tertiary fixed-top">
  <div class="container-fluid">
    <a class="navbar-brand" href="#">Offcanvas navbar</a>
    <button class="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="offcanvas offcanvas-end" tabindex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
      <div class="offcanvas-header">
        <h5 class="offcanvas-title" id="offcanvasNavbarLabel">Offcanvas</h5>
        <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
      </div>
      <div class="offcanvas-body">
        <ul class="navbar-nav justify-content-end flex-grow-1 pe-3">
          <li class="nav-item">
            <a class="nav-link active" aria-current="page" href="#">Home</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">Link</a>
          </li>
          <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
              Dropdown
            </a>
            <ul class="dropdown-menu">
              <li><a class="dropdown-item" href="#">Action</a></li>
              <li><a class="dropdown-item" href="#">Another action</a></li>
              <li>
                <hr class="dropdown-divider">
              </li>
              <li><a class="dropdown-item" href="#">Something else here</a></li>
            </ul>
          </li>
        </ul>
        <form class="d-flex mt-3" role="search">
          <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search">
          <button class="btn btn-outline-success" type="submit">Search</button>
        </form>
      </div>
    </div>
  </div>
</nav> -->

  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <img
      src="data:image/jpeg;base64,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"
      width="70" height="70">
    <a class="navbar-brand" href="#">ERM</a>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav"
      aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNav">
      <ul class="navbar-nav">
        <li class="nav-item active">
          <a class="nav-link" href="#">Home <span class="sr-only">(current)</span></a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#">Event</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#">Feedback</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#">User</a>
        </li>
      </ul>
    </div>
  </nav>



</template>



<script>
</script>