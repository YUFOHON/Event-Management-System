<template>

    <nav class="navbar  bg-body-tertiary shadow " style="background-color: white;">
      <div class="container gap-5 justify-content-start">
        <a class="navbar-brand " href="#">
          <img src="@/assets/CCF.jpg" alt="Bootstrap" width="50" height="50">
          CRM
        </a>
        <H1>EVENT</H1>
      </div>
    </nav>

</template>

<script>
export default {
  name: 'navBar',
  props: {
    msg: String
  }
}
</script>

<style scoped>
.navbar-brand {
  color: rgb(221, 10, 10);
  font-size: 2rem;
}

.container {
  margin-left: 0%;
}
</style>