<template>
	<div class="service-box">
		<main-header :text="text" @back="back"></main-header>
		<div class="service-zi">
			<div class="Qr-code">
				<div>
					<img :src="this.ershop" width="120px" height="120px" alt>
					<p>微信客服二维码</p>
				</div>
			</div>
			<ul>
				<li>
					<span class="li1">软件版权</span>
					<span class="li2">{{this.ownerCompany}}</span>
				</li>
				<li>
					<span class="li1">网址</span>
					<span class="li2">{{this.website}}</span>
				</li>
				<li>
					<span class="li1">客服电话</span>
					<span class="li2" style="color:green" @click="dial(phone)">一键拨号</span>
				</li>
				<li>
					<span class="li1">邮箱</span>
					<span class="li2">{{this.email}}</span>
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
	// import Request from "@/common/js/request";

	export default {
		data() {
			return {
				text: "客服中心",
				ershop: "",
				ownerCompany: "",
				email: "",
				website: "",
				phone: ""
			};
		},
		components: {
		},
		created() {
		
		},
		mounted() {
			this.service();
		},
		methods: {
			service() {
				let goCarlist = {
					cmd: "serviceCenter"
				};
				this.Request.post(goCarlist)
					.then(res => {
						console.log(res.data);
						if (res.data.result == 0) {
							this.ershop = res.data.qrcode;
							this.ownerCompany = res.data.ownerCompany;
							this.website = res.data.website;
							this.phone = res.data.phone;
							this.email = res.data.email;
						}
					})
					.catch(res => {

					});
			},
			back() {
				this.$router.push("/pages/my/main");
			},
			dial(e) {
      }
    }
	};
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
	.service-zi {
		padding: 72px 10px 0;
	}

	.Qr-code {
		height: 200px;

		div {
			width: 150px;
			margin: 30px auto;
			text-align: center;

			img {
				margin-bottom: 10px;
			}
		}
	}

	li {
		line-height: 40px;
		display: flex;
		justify-content: space-between;
	}

	.li1 {
		font-weight: 500;
	}

	.li2 {
		color: #818080;
	}
</style>
