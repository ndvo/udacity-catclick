var model = {
  cats: {
    'happy': { name: 'happy', src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/bb/Kittyply_edit1.jpg/330px-Kittyply_edit1.jpg', clicks: 0},
    'angry': { name: 'angry', src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Domestic_Cat_Face_Shot.jpg/330px-Domestic_Cat_Face_Shot.jpg', clicks: 0},
    'lovers': { name: 'lovers', src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6d/Listen%2C_do_you_want_to_know_a_secret.jpg/330px-Listen%2C_do_you_want_to_know_a_secret.jpg', clicks:0},
    'smart': { name: 'smart', src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/96/Jordi_cat_portrait.jpg/320px-Jordi_cat_portrait.jpg', clicks:0},
    'dumb' : { name: 'dumb', src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c4/Savannah_Cat_portrait.jpg/400px-Savannah_Cat_portrait.jpg', clicks:0}
  },
  currentCat: 'happy',
  admin: false
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
  applyTemplate: function(template, placeholder){
    document.querySelector(placeholder).innerHTML = document.querySelector(template).innerHTML;
  },
  displayCat: function (cat){
    catView.applyTemplate('#template-cat', '#current-cat');
    var newcat = document.querySelector('#cat-draft');
    newcat.setAttribute('id', cat.name);
    newcat.querySelector('.name').innerHTML = cat.name;
    var newImage = newcat.querySelector('img');
    newImage.setAttribute('src', cat.src);
    document.querySelector('.cat .counter').innerHTML = cat.clicks;
  },
  displayForm: function(cat){
    catView.applyTemplate("#template-admin-cat","#admin-cat"); 
    var form = document.querySelector('#form-draft');
    form.setAttribute('id', "cat-admin-form");
    form.querySelector('[name=name]').value = cat.name;
    form.querySelector('[name=url]').value = cat.src;
    form.querySelector('[name=clicks]').value = cat.clicks;
  },
  dismissForm: function(){
    document.querySelector('#admin-cat').innerHTML = '';
  }
}

var octopus = {
  getCat: function(name){
    return model.cats[name];
  },
  displayList: function(){
    var list = '';
    var catlist = Object.entries(model.cats);
    for (var i=0; i<catlist.length; i++){
      list += catListView.displayItem(catlist[i][0]);
    }
    catListView.displayList(list);
    document.querySelectorAll('#catlist a')
      .forEach(function(e){
        e.addEventListener('click', octopus.displayCatFromEvent);
      });
  },
  displayCatFromEvent: function(e){
    e.preventDefault();
    var catname = e.target.getAttribute('name');
    octopus.displayCat(catname);
  },
  displayCat : function(catname){
    catView.displayCat(octopus.getCat(catname));
    document.querySelectorAll('#current-cat img').forEach( function(i){ i.addEventListener('click', octopus.addOne); });
    model.currentCat = catname;
  },
  addOne: function(e){
    var catimage = e.target;
    counter = catimage.parentElement.querySelector('.counter');
    counter.innerHTML = +counter.innerHTML+1;
    octopus.getCat(e.target.parentElement.id)['clicks'] = counter.innerHTML;
  },
  editCat: function(){
    model.admin = true;
    catView.displayForm(octopus.getCat(model.currentCat));
  },
  saveCat: function(){
    var cat = octopus.getCat(model.currentCat);
    var form = document.querySelector('#cat-admin-form');
    cat.src = form.querySelector('[name=url]').value;
    cat.clicks = form.querySelector('[name=clicks]').value;
    var newname = form.querySelector('[name=name]').value;
    if (newname != cat.name){
      var oldname = cat.name;
      cat.name = newname;
      model.cats[cat.name] = cat;
      delete model.cats[oldname];
    }
    model.admin = false;
    model.currentCat = cat.name;
    console.log(cat);
    catView.dismissForm();
    octopus.displayList();
    octopus.displayCat(cat.name);
  }
} 

octopus.displayList();
