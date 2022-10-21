<template>
   <div>
      <img v-if="uploaded" :src="previewImage" class="profilePic" />
      <input type="file" accept="image/jpeg" @change=uploadImage>
   </div>
</template>

<script>
    export default {
        name:'UploadImage',
        data(){
            return{
                uploaded:false,
                previewImage:null
            }
        },
        methods:{
            uploadImage(e){
                const image = e.target.files[0];
                const reader = new FileReader();
                reader.readAsDataURL(image);
                this.uploaded = true;
                reader.onload = e =>{
                    this.previewImage = e.target.result;
                };
            }
        }
     }  
</script>



<style scoped>
.profilePic{
    display:flex;
    width: 100px;
    height: 100px;
    border: none;
}
 </style>