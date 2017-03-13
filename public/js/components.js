Vue.component('news', {
	props: {
		elid: Number,
		subject: String,
		text: String,
		isFormActivated: Boolean
	},
	created: function(){
		isFormActivated	= false;
	},
	methods: {
		deleteNews: function() {
			this.$emit('delete', this.elid);
		},
		updateNews: function() {
			this.isFormActivated = false;
			this.$emit('update', {id:this.elid,text:this.text,subject:this.subject});
		},
		toggleFormState: function(){
			this.isFormActivated = !this.isFormActivated;
		}
	},
	template: "\
	<div v-if='!isFormActivated'>\
		<p>{{subject}}</p>\
		<p>{{text}}</p>\
		<p><button v-on:click='deleteNews'>Удалить</button>\
		<button v-on:click='toggleFormState'>Редактировать</button></p>\
	</div>\
	<div v-else>\
		<p><input v-model='subject'></p>\
		<p><input v-model='text'></p>\
		<p><button v-on:click='updateNews'>Обновить</button></p>\
	</div>\
	"
});
