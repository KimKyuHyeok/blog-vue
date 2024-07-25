<template>
    <div id="main">
        <AddCategory/>
        <UpdateCategory/>
    </div>
</template>

<script>
import AddCategory from '@/components/admin/AddCategory.vue';
import UpdateCategory from '../../components/admin/UpdateCategory.vue';

export default {
    name: 'AdminPage',
    components: {
        AddCategory,
        UpdateCategory
    }
}
</script>

<style>

#main {
    flex-direction: column;
}

#password > h1 {
    margin-bottom: 30%;
}
</style>