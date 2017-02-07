new Vue({
    el:"#app",
    data:{
        productList:[],
        total:0,
        checkAllBl:false,
        checkAllText:"全选",
        dialogShowBl:false,
        deleteIndex:0
    },
    filters:{
        moneySkin:function(v){
            return "￥"+v.toFixed(2);
        },
        formatMoney:function(v,s){
            return v.toFixed(2)+s;
        }
    },
    mounted:function(){
        this.$nextTick(function () {
            this.getData();
        });     
    },
    methods:{
        getData:function(){
            var _this = this;
            this.$http.get("http://192.168.123.100:8000/data/data.json").then(function(res){
                _this.productList=res.body.product.list;
                //_this.total=res.body.product.total;
            });
        },
        changeNum:function(item,way){
            if(way<0){
                item.num--;
                if(item.num<1){
                    item.num=1;
                }
            }else{
                item.num++;
            }
            this.checkMoney();
        },
        checkProduct:function(item,idx){
            if(typeof item.checkFlag=="undefined"){
                this.$set(item,"checkFlag",true);
            }else{
                item.checkFlag=!item.checkFlag;
            }
            // 这块想的脑袋大
            var i = 0;
            this.productList.forEach(function(v){
                if (v.checkFlag) {
                    i++;
                }else{
                    i--;
                }
            });
            if(i>=this.productList.length){
                this.checkAllText="取消全选";
                this.checkAllBl=true;
            }else{
                this.checkAllText="全选";
                this.checkAllBl=false;
            }

            this.checkMoney();
        },
        checkMoney:function(){
            var _this=this;
            this.total=0;
            this.productList.forEach(function(v,i){
                if(v.checkFlag){
                    _this.total+=v.num*v.per_price;
                }
            });
        },
        checkAll:function(){
            this.checkAllBl=!this.checkAllBl;
            this.checkAllText=this.checkAllBl===true?"取消全选":"全选";
            var _this=this;
            if(this.checkAllBl){
                this.productList.forEach(function(v,i){
                    if(typeof v.checkFlag=="undefined"){
                        _this.$set(v,"checkFlag",_this.checkAllBl);
                    }else{
                        v.checkFlag=_this.checkAllBl;
                    }
                });
            }else{
                this.productList.forEach(function(v,i){
                    v.checkFlag=_this.checkAllBl;
                });
            }
            this.checkMoney();
        },
        deleteProduct:function(i){
            this.dialogShowBl=true;
            this.deleteIndex=i;
        },
        yesDelete:function(){
            this.productList.splice(this.deleteIndex,1);
            this.dialogShowBl=false;
            this.checkMoney();
        },
        confirm:function(){
            var newObj= {};
            newObj.total = this.total;
            newObj.list = [];
            this.productList.forEach(function(v,i){
                if(v.checkFlag){
                    newObj.list.push({
                        name:v.name,
                        introduce:v.introduce,
                        tag:v.tag,
                        img:v.img,
                        per_price:v.per_price,
                        num:v.num
                    });
                }
            });
            console.log(newObj);

            // 这块想的脑袋大
            var i = 0;
            this.productList.forEach(function(v){
                if (v.checkFlag) {
                    i++;
                }else{
                    i--;
                }
            });
            console.log(i)
            if(i>-this.productList.length){
                location.href="address.html";
            }else{
                alert("选择要购买的物品")
            }
        }
    }
});