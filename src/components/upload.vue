<template>
	<div class="box"  @mouseover="mover" @mouseleave="leave">
		<el-upload class="avatar-uploader" :headers="headers" action="/upload/common/" :show-file-list="false" :data={type}
		 :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
			<img v-if="form.avatar"  :src="form.avatar" class="avatar" >
			<i v-else class="el-icon-plus avatar-uploader-icon"></i>
			
		</el-upload>
		<div class="shade" v-show="isShow" @click="deletes"><i class="el-icon-delete"></i></div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				// imageUrl: '',
				type:'common',
				isShow:false,
				headers:{
					Authorization:`Bearer ${sessionStorage.token}`
				},
			};
		},
		props:['form','form'],
		methods: {
			handleAvatarSuccess(res, file) {
				
				
				this.form.avatar = res.data;
			},
			
			beforeAvatarUpload(file) {
				const isJPG = file.type === 'image/jpeg';
				const isLt2M = file.size / 1024 / 1024 < 2;

				if (!isJPG) {
					this.$message.error('上传头像图片只能是 JPG 格式!');
				}
				if (!isLt2M) {
					this.$message.error('上传头像图片大小不能超过 2MB!');
				}
				return isJPG && isLt2M;
			},
			//鼠标进入滑过
			mover() {
				if(this.form.avatar !== ''){
					this.isShow = true;
				}
				
			},
			leave() {
				this.isShow = false;
				
			},
			//删除图片
			deletes() {
				this.form.avatar = '';
				this.isShow = false;
				// console.log(this.imageUrl);
			}
		}
	}
</script>

<style scoped="scoped">
	.box {
		display: inline-block;
		position: relative;
		border: none;
		position: relative;
		left: 50px;
	}
	.avatar-uploader .el-upload {
		border: 1px dashed #d9d9d9;
		border-radius: 6px;
		cursor: pointer;
		position: relative;
		overflow: hidden;
	}

	.avatar-uploader .el-upload:hover {
		border-color: #409EFF;
	}

	.avatar-uploader-icon {
		border: 1px dashed #d9d9d9;
		font-size: 28px;
		color: #8c939d;
		width: 178px;
		height: 178px;
		line-height: 178px;
		text-align: center;
	}

	.avatar {
		width: 178px;
		height: 178px;
		display: block;
	}
	.shade {
		width: 178px;
		height: 178px;
		background: rgba(0,0,0,0.7);
		position: absolute;
		top: 0;
		z-index: 500;
		text-align: center;
		line-height: 178px;
		font-size: 35px;
		color: white;
	}

</style>
