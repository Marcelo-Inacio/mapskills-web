/**
 * funcionalidade de auxilio a acesso ao storage do navegador
 */
var StorageHelper = (function($window) {

	var SH = {};

	SH.setItem = function(chave, valor) {
		window.localStorage.setItem(chave, angular.toJson(valor));
	};

	SH.getItem = function(chave) {
		return angular.fromJson(window.localStorage.getItem(chave));
	};

	SH.removeItem = function(chave) {
		window.localStorage.removeItem(chave);
	}

	return SH;

})();
/**
 * funcionalidade que retorna o token contido no storage
 * @returns
 */
function getToken() {
	return StorageHelper.getItem('Authorization');
}
/**
 * funcionalidade que retorna a URL padrao de recursos ao servidor
 */
function getDefaultUrlPath() {
	return "http://localhost:8080/mapskills";
}
