<template>
    <div id="main">
        <AddCategory/>
        <UpdateCategory/>
        <DeleteCategory/>
    </div>
</template>

<script>
import AddCategory from '@/components/admin/AddCategory.vue';
import UpdateCategory from '../../components/admin/UpdateCategory.vue';
import DeleteCategory from '../../components/admin/DeleteCategory.vue';

export default {
    name: 'AdminPage',
    components: {
        AddCategory,
        UpdateCategory,
        DeleteCategory
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