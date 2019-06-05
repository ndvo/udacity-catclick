var model = {
  'happy': { name: 'happy', src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/bb/Kittyply_edit1.jpg/330px-Kittyply_edit1.jpg', clicks: 0},
  'angry': { name: 'angry', src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Domestic_Cat_Face_Shot.jpg/330px-Domestic_Cat_Face_Shot.jpg', clicks: 0},
  'lovers': { name: 'lovers', src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6d/Listen%2C_do_you_want_to_know_a_secret.jpg/330px-Listen%2C_do_you_want_to_know_a_secret.jpg', clicks:0},
  'smart': { name: 'smart', src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/96/Jordi_cat_portrait.jpg/320px-Jordi_cat_portrait.jpg', clicks:0},
  'dumb' : { name: 'dumb', src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c4/Savannah_Cat_portrait.jpg/400px-Savannah_Cat_portrait.jpg', clicks:0}
};

var catListView = {
  displayItem: function(catname){
    return '<li><a name="'+catname+'" id="list-item-'+catname+'" >'+catname+'</a></li>';
  },
  displayList: function(list){
    document.querySelector('#catlist ol').innerHTML = list;
  }
}

var catView = {
  displayCat: function (cat){
    var catTemplate = document.querySelector("template#cat");
    // resets the cat display area
    document.querySelector('section.cats').innerHTML=catTemplate.innerHTML;
    var newcat = document.querySelector('#cat-draft');
    newcat.setAttribute('id', cat.name);
    newcat.querySelector('.name').innerHTML = cat.name;
    var newImage = newcat.querySelector('img');
    newImage.setAttribute('src', cat.src);
    document.querySelector('.cat .counter').innerHTML = cat.clicks;
  }
}

var octopus = {
  getCat: function(name){
    return model[name];
  },
  displayList: function(){
    var list = '';
    var catlist = Object.entries(model);
    for (var i=0; i<catlist.length; i++){
      list += catListView.displayItem(catlist[i][0]);
    }
    catListView.displayList(list);
    document.querySelectorAll('#catlist a')
      .forEach(function(e){
        e.addEventListener('click', octopus.displayCat);
      });
  },
  displayCat : function(e){
    console.log(e);
    e.preventDefault();
    var catname = e.target.getAttribute('name');
    catView.displayCat(octopus.getCat(catname));
    document.querySelectorAll('section.cats img').forEach( function(i){ i.addEventListener('click', octopus.addOne); });
  },
  addOne(e){
    var catimage = e.target;
    counter = catimage.parentElement.querySelector('.counter');
    counter.innerHTML = +counter.innerHTML+1;
    octopus.getCat(e.target.parentElement.id)['clicks']+=1;
  }

} 

octopus.displayList();


