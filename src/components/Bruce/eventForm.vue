<template>

    <form>
        <div class="row">
            <div class="col">
                <div class="mb-3">
                    <label for="eventName" class="form-label">活動名稱</label>
                    <input type="email" class="form-control" id="eventName" aria-describedby="emailHelp">
                </div>
                <div class="mb-3">
                    <label for="eventDate" class="form-label">活動地點</label>
                    <input type="password" class="form-control" id="exampleInputPassword1">
                </div>
                <div class="mb-3 form-check">
                    <input type="checkbox" class="form-check-input" id="exampleCheck1">
                    <label class="form-check-label" for="exampleCheck1">Check me out</label>
                </div>



            </div>
            <div class="col">
                <div class="mb-3">
                    <label for="eventDate" class="form-label">活動日期</label>
                    <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp">
                </div>
                <div class="mb-3">
                    <label for="exampleInputPassword1" class="form-label">Password</label>
                    <input type="password" class="form-control" id="exampleInputPassword1">
                </div>
                <div class="mb-3 form-check">
                    <input type="checkbox" class="form-check-input" id="exampleCheck1">
                    <label class="form-check-label" for="exampleCheck1">Check me out</label>
                </div>



            </div>
        </div>
    </form>

</template>

<script>

</script>

<style scoped>
.row {
    display: flex;
    flex-wrap: wrap;
    margin-right: 10px;
    margin-left: 10px;
}
</style>