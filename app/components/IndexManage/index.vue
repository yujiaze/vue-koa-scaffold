<template>
    <div>
        <navigation v-if="editable == 'navigation'" :top-navigation-list="topNavigationList" :left-navigation-list="leftNavigationList" :unshow-navigation-list="unshowNavigationList" :add-navigation="addNavigation" :exchange-navigation="exchangeNavigation" :del-navigation="delNavigation" :sort-navigation="sortNavigation" :release-navigation="releaseNavigation" :cancel-navigation="cancelNavigation" />
        <fragment v-if="editable == 'fragment'" :channelId="parseInt(channelId)" :get-article="getArticle" :sort-article="sortArticle" :add-article="addArticle" :remove-article="removeArticle" :exchange-article="exchangeArticle" :release-article="releaseArticle" :cancel-article="cancelArticle" :channel-article="channelArticle" />
    </div>
</template>


<script>
import { mapActions, mapState } from 'vuex'
import { Tab } from '../../ui'
import { NAV_CODE_MAP } from '../../store/modules/index-manage.js'
import Navigation from './Navigation.vue'
import Fragment from './Fragment.vue'
export default {
    name: 'IndexManage',
    data() {
        return {
            editable: '',
            channelId: null
        }
    },
    components: {
        'tab': Tab,
        'tab-item': Tab.TabItem,
        'navigation': Navigation,
        'fragment': Fragment,
    },
    computed: {
        ...mapState({
            topNavigationList: state => state.IndexManageState.navigationList[NAV_CODE_MAP.TOP],
            leftNavigationList: state => state.IndexManageState.navigationList[NAV_CODE_MAP.LEFT],
            unshowNavigationList: state => state.IndexManageState.navigationList[NAV_CODE_MAP.UNSHOW],
            channelArticle(state) {
                return state.IndexManageState.articleAll[this.channelId] || {}
            }
        })
    },
    created() {
        this.initialize()
    },
    beforeRouteEnter(to, from, next) {
        next(vm => {
            vm.editable = to.params.editable
            vm.channelId = to.params.channelId;
            !('1' in vm.channelArticle) && vm.getArticle({
                channelId: to.params.channelId,
                region: 1
            })
        })
    },
    beforeRouteUpdate(to, from, next) {
        this.editable = to.params.editable
        this.channelId = to.params.channelId;
        !('1' in this.channelArticle) && this.getArticle({
            channelId: to.params.channelId,
            region: 1
        })
        next()
    },
    methods: {
        ...mapActions({
            initialize: 'initialize',
            exchangeNavigation: 'exchangeNavigation',
            delNavigation: 'delNavigation',
            addNavigation: 'addNavigation',
            sortNavigation: 'sortNavigation',
            releaseNavigation: 'releaseNavigation',
            cancelNavigation: 'cancelNavigation',
            getArticle: 'getArticle',
            addArticle: 'addArticle',
            exchangeArticle: 'exchangeArticle',
            removeArticle: 'removeArticle',
            sortArticle: 'sortArticle',
            releaseArticle: 'releaseArticle',
            cancelArticle: 'cancelArticle'
        })
    }
}
</script>

<style scoped lang="postcss">
    
</style>