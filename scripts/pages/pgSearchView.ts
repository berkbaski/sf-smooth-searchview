import PgSearchViewDesign from 'generated/pages/pgSearchView';
import Color from 'sf-core/ui/color';
import FlexLayout from 'sf-core/ui/flexlayout';
import ListView from 'sf-core/ui/listview';
import ListViewItem from 'sf-core/ui/listviewitem';
import SearchView from 'sf-core/ui/searchview';

export default class PgSearchView extends PgSearchViewDesign {
    constructor() {
        super();
        // Overrides super.onShow method
        this.onShow = onShow.bind(this, this.onShow.bind(this));
        // Overrides super.onLoad method
        this.onLoad = onLoad.bind(this, this.onLoad.bind(this));
    }

    initEverything() {
        var myListView = new ListView({ flexGrow: 1, itemCount: 100, contentInset: { top: 50, bottom: 0 } });
        myListView.backgroundColor = Color.TRANSPARENT;
        this.layout.addChild(myListView);
        myListView.nativeObject.contentOffset = { x: 0, y: 0 };
        myListView.onRowCreate = function (type) {
            var myListViewItem = new ListViewItem();
            return myListViewItem;
        };
        myListView.onRowHeight = function (index) {
            return 70;
        };
        myListView.onRowBind = function (listViewItem, index) {
            listViewItem.backgroundColor = index % 2 == 0 ? Color.RED : Color.YELLOW;
        };
        var maxSearchHeight = 50;
        var innerMaxSearchFlexHeight = 40;
        var innerMaxSearchFlexBorderRadius = 10;
        var searchFlex = new FlexLayout();
        // searchFlex.backgroundColor = Color.BLACK;
        searchFlex.positionType = FlexLayout.PositionType.ABSOLUTE;
        searchFlex.top = 0;
        searchFlex.left = 0;
        searchFlex.right = 0;
        searchFlex.height = 0;
        searchFlex.alpha = 0;
        // searchFlex.justifyContent = FlexLayout.JustifyContent.CENTER;        
        var innerSearchFlex = new FlexLayout();
        innerSearchFlex.backgroundColor = Color.LIGHTGRAY;
        innerSearchFlex.borderRadius = 15;
        innerSearchFlex.height = 0;
        innerSearchFlex.marginTop = 5;
        innerSearchFlex.marginLeft = 20;
        innerSearchFlex.marginRight = 20;
        searchFlex.addChild(innerSearchFlex);
        var searchBar = new SearchView();
        searchBar.positionType = FlexLayout.PositionType.ABSOLUTE;
        searchBar.left = 0;
        searchBar.right = 0;
        searchBar.bottom = -20;
        searchBar.top = -20;
        searchBar.hint = "Search";
        // @ts-ignore
        searchBar.nativeObject.setSearchFieldBackgroundImage(__SF_UIImage.getInstance(), 0);
        searchBar.ios.searchViewStyle = SearchView.iOS.Style.MINIMAL;
        searchBar.backgroundColor = Color.LIGHTGRAY;
        searchBar.textFieldBackgroundColor = Color.LIGHTGRAY;
        innerSearchFlex.addChild(searchBar);
        this.layout.addChild(searchFlex);
        myListView.onScroll = function (params) {
            if (params.contentOffset.y >= 0 && params.contentOffset.y < maxSearchHeight) {
                searchFlex.height = maxSearchHeight - params.contentOffset.y;
                innerSearchFlex.height = innerMaxSearchFlexHeight - params.contentOffset.y;
                innerSearchFlex.borderRadius = innerSearchFlex.height * innerMaxSearchFlexBorderRadius / innerMaxSearchFlexHeight;
                searchFlex.alpha = searchFlex.height / maxSearchHeight;
                searchFlex.applyLayout();
            } else if (params.contentOffset.y < 0) {
                if (searchFlex.height != maxSearchHeight) {
                    searchFlex.height = maxSearchHeight;
                    innerSearchFlex.height = innerMaxSearchFlexHeight;
                    innerSearchFlex.borderRadius = innerMaxSearchFlexBorderRadius;
                    searchFlex.alpha = 1;
                    searchFlex.applyLayout();
                }
            } else {
                if (searchFlex.height != 0) {
                    searchFlex.height = 0;
                    innerSearchFlex.height = 0;
                    searchFlex.alpha = 0;
                    searchFlex.applyLayout();
                }
            }
        }
        // @ts-ignore
        myListView.ios.onScrollEndDecelerating = function (contentOffset) { stopScroll(contentOffset); }
        // @ts-ignore
        myListView.ios.onScrollEndDraggingWillDecelerate = function (contentOffset, decelerate) {
            if (!decelerate) {
                stopScroll(contentOffset);
            }
        }
        function stopScroll(contentOffset) {
            if (contentOffset.y > 0 && contentOffset.y < maxSearchHeight) {
                var contentOffsetY = ((contentOffset.y / maxSearchHeight) <= 0.5) ? -maxSearchHeight : 0;
                myListView.nativeObject.setContentOffsetAnimated({ x: 0, y: contentOffsetY }, true);
            }
        }
    }
}

/**
 * @event onShow
 * This event is called when a page appears on the screen (everytime).
 * @param {function} superOnShow super onShow function
 * @param {Object} parameters passed from Router.go function
 */
function onShow(superOnShow: () => void) {
    superOnShow();
}

/**
 * @event onLoad
 * This event is called once when page is created.
 * @param {function} superOnLoad super onLoad function
 */
function onLoad(superOnLoad: () => void) {
    superOnLoad();
    this.headerBar.title = "11111";
    this.initEverything();
}
