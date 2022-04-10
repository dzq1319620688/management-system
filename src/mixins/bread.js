export default {
    data() {
        return {
            breadList: [],
        };
    },
    watch: {
        $route (route) {
        // if you go to the redirect page, do not update the breadcrumbs
        if (route.path.startsWith('/redirect/')) {
            return
        }
        this.getbread()
        }
    },
    created() {
        this.getbread();
    },
    methods: {
        getbread() {
            this.breadList = this.$route.meta.bread || [];
        },
    },
}