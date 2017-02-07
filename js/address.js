new Vue({
    el:"#address",
    data:{
        addressList:[],
        showItem:4,
        isOpen:false,
        postType:1
    },
    computed:{
        showItemFn:function(){
            return this.addressList.slice(0,this.showItem);
        }
    },
    mounted:function(){
        this.$nextTick(function () {
            this.getAddressList();
        }); 
    },
    methods:{
        getAddressList:function(){
            this.$http.get("data/address.json").then(function(res){
                this.addressList=res.data.result;
            });
        },
        loadMore:function(){
            if(!this.isOpen){
                this.showItem = this.addressList.length;
                this.isOpen=true;
            }else{
                this.showItem = 4;
                this.isOpen=false;
            }
        },
        selectedList:function(item){
            this.addressList.forEach(function(v){
                v.defaultSelect=false;
                if(item.defaultSelect===v.defaultSelect){
                    item.defaultSelect=true;
                }
            });
        },
        selectedDefault:function(item){
            this.addressList.forEach(function(v){
                v.defaultAddress=false;
                if(item.defaultAddress===v.defaultAddress){
                    item.defaultAddress=true;
                }
            });
        }
    }
});