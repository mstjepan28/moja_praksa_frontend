<template>
  <div class="container">

    <div class="row mt-1">
      <div class="col-md-8" >
        <img src="fipu_hr.png" class="img-responsive logo_left">
      </div>
      
      <div class="col-md-4 right-col mt-3">
          <router-link to="/" class="login">Prijava <i class="fas fa-sign-in-alt" aria-hidden="true"></i> </router-link>
          
          <form class="form-inline d-flex justify-content-end md-form form-sm active-cyan-2">
            <input class="form-control form-control-sm mr-1 w-75" type="text" placeholder="Pretraživanje..." aria-label="Search">
            <button type="submit"><i class="fas fa-search" aria-hidden="true"></i></button>
          </form>
      </div>

    </div>

    <nav class="row navbar navbar-expand-lg navbar-light">
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav">
          <li class="nav-item">
            <router-link to="/">Naslovnica</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/">Naslovnica</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/">Naslovnica</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/">Naslovnica</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/">Naslovnica</router-link>
          </li>
        </ul>
      </div>

    </nav>
    
    <div class="row">
      <router-view/>
    </div>
  </div>
</template>

<style lang="scss">
.img-responsive{
    display: block;
    max-width: 100%;
    height: auto;
}
.logo_left{
  max-height: 110px;
}

.login{
  color:#aae0f6;
  font-size: 17px;
}
.right-col{
  padding-bottom: 5px;
  text-align: right;
}
.right-col > router-link{
  color: #aae0f6;
  display: inline-block;
}
.right-col > form > input{
  border-radius: 0;
  border: #aae0f6 2px solid;
}
.right-col > form > button > .fas{
  font-size: 18px;
  color: #aae0f6;
}

.navbar{
  background: #aae0f6;
}
.navbar-nav{
  text-align: center;
  margin: 0 auto;
}
.nav-item {
  margin-left: 2%;
  display: inline-block;
}

.nav-item > a{
  font-size: 17px;
  color: white;
}
</style>
