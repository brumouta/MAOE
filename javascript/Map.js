/*
 * Cria um novo mapa do google no canvas indicado
 *
 * @PARAMETERS: canvas - elemento HTML (document.getElementById) onde o mapa
 *                       será colocado
 *              mapa_url - url da imagem de sobreposiçã do mapa
 *              lat - latitude do ponto de vista
 *              lng - longitude do ponto de vista
 */
function Map (canvas, mapa_url, lat, lng) {
    var marks     = [];

    // Posição central do mapa
    var myLatLng  = new google.maps.LatLng(lat, lng);
    var myOptions = {
        zoom: 19,
        center: myLatLng,
        mapTypeId: google.maps.MapTypeId.SATELLITE
    };

    // carrga o mapa
    var map     = new google.maps.Map(canvas, myOptions);

    // Cria as posições do canto para a imagem de sobreposição
    var swBound = new google.maps.LatLng(-23.5176592030716, -46.6374027729034);
    var neBound = new google.maps.LatLng(-23.5151652281024, -46.6346494853497);
    var bounds  = new google.maps.LatLngBounds(swBound, neBound);

    // Carrega a imagem de sobreposição
    var oldmap  = new google.maps.GroundOverlay(mapa_url, bounds);
    oldmap.setMap(map);

    /*
     * Método que adiciona uma nova marca ao mapa
     * @PARAMETERS: campuseiro - objeto com as informações de localização
     *                           e imagem do campuseiro
     */
    this.addMark = function (campuseiro) {
        if (!map) { // Se o mapa NÃO foi criado
            alert('O mapa não foi instanciado');
            return false;
        }

        var mark = createMark(
            campuseiro.lat,
            campuseiro.lng,
            campuseiro.image,
            campuseiro.url,
            campuseiro.name
        );

        marks.push(mark);
    }

    /*
     * Cria a nova marca com os dados recebidos
     * @PARAMETERS: lat - latitude da marca
     *              lng - longitude da marca
     *              image - a imagem para a janela de informação
     *              url - perfil no facebook
     *              name - nome ou nick name do campuseiro
     */
    function createMark (lat,lng,image,url,name) {
        var infowindow = new google.maps.InfoWindow();
        
        var conteudo = '<h2 class="firstHeading"><img src="' +
            image + '" style="width:48px;"> <a target="_blank" href="' +
            url + '">' +
            name + '</h2></a>'+
            '<div class="bodyContent">'+
            '<p>'+'</p>'+
            '</div>';
      
        var marca = new google.maps.Marker({
            position: new google.maps.LatLng(lat, lng),
            map: map,
            title:name
          });
      
        google.maps.event.addListener(marca, 'click', function() {
            infowindow.setContent(conteudo);
            infowindow.open(map, marca);
          });

        return marca;
    }
}