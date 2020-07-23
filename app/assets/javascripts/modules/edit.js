$(function(){
  function appendOption(category){
    var html = `<option value="${category.id}" data-category="${category.id}">${category.name}</option>`;
    return html;
  }

// 子カテゴリー用のhtmlの作成。子カテゴリーのidはいらないので name=""としています。
  function appendChild(insertHTML) {
    var childSelectHTML = '';
    childSelectHTML = ` <div class="listing-select-wrapper--edit__child">
                          <select class="listing-select-wrapper--edit__child--select" id="child_category_edit" name="">
                            <option value="---" data-category="---">---</option>
                            ${insertHTML}
                          </select>
                        </div>`;
    $('.listing-select-wrapper--edit').append(childSelectHTML);
  }

// 孫カテゴリー用のhtmlを作成。孫カテゴリーのidが欲しいのでname="product[category_id]"としています。
  function appendGrandChild(insertHTML) {
    var grandChildSelect = '';
    grandChildSelect = `<div class="listing-select-wrapper--edit__grandchild">
                          <select class="listing-select-wrapper--edit__grandchild--select" id="grandchild_category_edit" name="product[category_id]">
                            <option value="---" data-category="---">---</option>
                            ${insertHTML}
                          </select>
                        </div>`;
    $('.listing-select-wrapper--edit').append(grandChildSelect);
  }

// 親カテゴリーの値が変わった時の処理を書きます
  $('#parent_category_edit').on('change', function() {
  // 親カテゴリーのデータを取得して変数にいれる
    var productcategory = document.getElementById('parent_category_edit').value;//.value;new FormData(this).value;
    if (productcategory != ''){
     // ajaxの処理。urlを/products/category_childrenにしないとrenderでeditに戻された時に上手く働かない
      $.ajax({
        url: 'category_children',
        type: 'GET',
        data: { productcategory: productcategory },
        dataType: 'json'
      })
     // 成功した時の処理
      .done(function(children){
     // 元々あった子カテゴリーと孫カテゴリーを消す。
        $('.listing-select-wrapper--edit__child--select').remove();
        $('.listing-select-wrapper--edit__grandchild--select').remove();
     // insertHTMLを定義して中身にオプションをつける。
        var insertHTML = '';
        children.forEach(function(child){
          insertHTML += appendOption(child);
        });
        // オプション付きのinsertHTMLをappendChildにいれる。
        // 上のappendChildで定義された$('.listing-select-wrapper--edit').append(childSelectHTML);により一番、つまり親カテゴリーのしたに差し込まれる。
        appendChild(insertHTML);
      })
      .fail(function(){
        alert('カテゴリー取得に失敗しました');
      })
    }else {
      $('#child_category_edit').remove();
      $('#grandchild_category_edit').remove();
    }
  });

  // 子カテゴリーとやっていることは基本的に同じです 
  $('.listing-select-wrapper--edit').on('change', '#child_category_edit', function(){
    var productcategory  = document.getElementById('child_category_edit').value;
    if (productcategory  !== "") {
      $.ajax({
        url: 'category_grandchildren',
        type: 'GET',
        data: { productcategory: productcategory  },
        dataType: 'json'
      })
      .done(function(grandchildren) {
        if (grandchildren.length != 0) {
          $('#grandchild_category_edit').remove();
          var insertHTML = '';
          grandchildren.forEach(function(grandchild){
            insertHTML += appendOption(grandchild);
          });
          appendGrandChild(insertHTML);
        }
      })
      .fail(function(){
        alert('カテゴリー取得に失敗しました');
      })
    }else {
      $('#grandchild_category_edit').remove();
    }
  })
})