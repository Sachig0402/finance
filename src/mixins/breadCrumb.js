export default {
    data() {
        return {
            breadlist: [],
        }
    },
    created() {
        this.getBreadlist();
    },
    watch:{
        $route(){
            this.getBreadlist()
        }
    },
    methods: {
        getBreadlist() {
            this.breadlist = this.$route.meta.bread ? this.$route.meta.bread : []
        }
    }
}