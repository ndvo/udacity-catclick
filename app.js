var model = {
  cats: {
    'happy': { name: 'happy', src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/bb/Kittyply_edit1.jpg/330px-Kittyply_edit1.jpg', clicks: 0},
    'angry': { name: 'angry', src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Domestic_Cat_Face_Shot.jpg/330px-Domestic_Cat_Face_Shot.jpg', clicks: 0},
    'lovers': { name: 'lovers', src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6d/Listen%2C_do_you_want_to_know_a_secret.jpg/330px-Listen%2C_do_you_want_to_know_a_secret.jpg', clicks:0},
    'smart': { name: 'smart', src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/96/Jordi_cat_portrait.jpg/320px-Jordi_cat_portrait.jpg', clicks:0},
    'dumb' : { name: 'dumb', src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c4/Savannah_Cat_portrait.jpg/400px-Savannah_Cat_portrait.jpg', clicks:0}
  },
  currentCat: ko.observable('happy'),
  admin: false
};



var catListView = {
  displayItem: function(catname){
    return '<li><a name="'+catname+'" id="list-item-'+catname+'" >'+catname+'</a></li>';
  },
}

var catView = {
  applyTemplate: function(template, placeholder){
    document.querySelector(placeholder).innerHTML = document.querySelector(template).innerHTML;
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

var ViewModel = function(){
  this.catNickNames = ko.observableArray(Object.keys(model.cats));
  this.currentCat = ko.computed(function(){
    return ko.observable(model.cats[model.currentCat()]);
  });

  this.catlist = Object.entries(model.cats);

  this.getCat = function(name){
    return model.cats[name];
  };
  
  this.addOne = (e)=>{
    this.currentCat().clicks += 1;
  };


  this.displayCat = (catname)=>{
    model.currentCat(catname);
  };
  
  this.editCat = function(){
    model.admin = true;
    catView.displayForm(getCat(model.currentCat()));
  };

  this.saveCat = function(){
    var cat = getCat(model.currentCat());
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
    model.currentCat(cat.name);
    console.log(cat);
    catView.dismissForm();
    displayCat(cat.name);
  };
} 


ko.applyBindings(new ViewModel());
