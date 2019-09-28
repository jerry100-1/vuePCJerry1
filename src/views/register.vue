<template>
    <div class="register-container">
        <div class="register-label">
            <img src="./registerImages/653a80de79809d74be51cbfb55edefa.png" alt="">
            <div class="register-label-title">
                <h3>传控疾病后台管理系统</h3>
                <h4>BACKGROUND&nbsp;MANAGEMENT&nbsp;SYSTEM</h4>
            </div>
        </div>
        <div class="register-entrance">
            <h3>登录入口</h3>
            <div class="register-entrance-user">
                <img src="./registerImages/用户.png" alt="">
                <el-input v-model="user" placeholder="请输入用户名"></el-input>
            </div>
            <div class="register-entrance-pwd">
                <img src="./registerImages/密码.png" alt="">
                <el-input v-model="pwd" placeholder="请输入密码" show-password></el-input>
            </div>
            <template>
                <el-checkbox v-model="checked">记住密码</el-checkbox>
            </template>
            <div class="entrance-button">
                <el-button
                        @click.prevent="enter"
                >登录</el-button>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name:'register',
        data () {
            return {
                user:'',
                pwd:'',
                checked:true
            }
        },
        methods:{
            enter(){

                let username=this.user;
                let password=this.pwd;
                if(username.trim() == '') return  this.$message('请输入用户名');
                if(password.trim() == '') return  this.$message('请输入密码');

                // let token=localStorage.getItem("token");

                this.$http.post('/admin/User/login',{
                    username,
                    password
                }).then(response=>{

                    console.log("返回信息"+response);

                    if(response.data.status === "1"){
                        // this.$router.push('/home/user/userInfo');this.$router.go(-1);
                        // this.$message(response.data.message);
                         // this.$router.go(-1);
                        this.$message({
                            message: response.data.result.msg,
                            type: 'success'
                        });
                        let token=response.data.result.token;
                        let userinfo=JSON.stringify(response.data.result.userinfo);

                        localStorage.setItem('token',token);
                        localStorage.setItem('userinfo',userinfo)

                        if(localStorage.getItem('token')!=""&&localStorage.getItem('userinfo')!="")
                        {
                            this.$router.push('/home/user/userInfo');
                        }else
                        {
                            return;
                        }

                    }else
                    {
                        this.$message.error("用户名和密码错误,请重新登录!");
                        return;

                    }


                })

            }
        }
    }
</script>

<style lang="less">
    html,body{
        height: 100%;
    }
    body{
        margin: 0;
    }
    .register-container{
        width: 100%;
        height: 100%;
        background-image: url('./registerImages/u=2058555303,1098795827&fm=27&gp=0.jpg');
        background-repeat: no-repeat;
        background-size:100% 100%;
        /*background-color: red;*/
        position: relative;
        .register-label{
            width: 100%;
            height: 200px;
            background-color: rgba(141, 201, 211,0.8);
            position: absolute;
            top: 50%;
            left:0;
            transform: translateY(-50%);
            padding-left:260px;
            display: flex;
            align-items: center;
            img{
                height:140px;
                margin-right:40px;
            }
            .register-label-title{
                // margin-bottom: 30px;
                h3{
                    font-size: 44px;
                    color: #1B3A7D;
                    font-weight: 700;
                    margin-bottom: 15px;
                }
                h4{
                    font-size: 12px;
                    color:#fff;
                    letter-spacing:7px;
                    text-align: center;
                }
            }
        }
        .register-entrance{
            width: 420px;
            height: 370px;
            background-color: #45ACBB;
            position: absolute;
            top: 50%;
            right: 15%;
            transform: translate(-15%,-50%);
            padding: 40px;
            border-radius: 5px;
            h3{
                width: 100%;
                color: #fff;
                text-align: center;
                font-size: 18px;
                margin-bottom: 75px;
            }
            .register-entrance-user,.register-entrance-pwd{
                display: flex;
                align-items: center;
                img{
                    height: 24px;
                    margin-right:18px;
                }
                input{
                    background-color: transparent;
                    border: 1px solid #fff;
                    color: #fff;
                    font-size: 16px;
                    &::-webkit-input-placeholder{
                        color: #fff;
                        font-size: 16px;
                    }
                    &:-moz-placeholder{
                        color: #fff;
                        font-size: 16px;
                    }
                    &::-moz-placeholder{
                        color: #fff;
                        font-size: 16px;
                    }
                    &:-ms-input-placeholder{
                        color: #fff;
                        font-size: 16px;
                    }
                }
            }
            .register-entrance-pwd{
                margin-top: 40px;
            }
            .el-checkbox{
                margin-left: 42px;
                margin-top: 30px;
                span{
                    color:#fff;
                    vertical-align: middle;
                    .el-input .el-input__clear{
                        color:#fff;
                    }
                }
            }
            .entrance-button{
                width: 100%;
                margin-top: 60px;
                button{
                    width: 100%;
                    height: 50px;
                    background-color: #2AFEEF;
                    border: none;
                    font-size: 18px;
                    color:#1B387C;
                }
            }
        }
    }
</style>
