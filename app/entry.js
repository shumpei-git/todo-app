'use strict';
import $ from 'jquery';
const completeNumDivided = $('#complete-num');
const restNumDivided = $('#rest-num');
const levelDivided = $('#level');
const titleInput = $('#title');
const descriptionInput = $('#description');
const createButton = $('#create-button');
const todoDivided = $('#todo-area');
//var completeLink = $('.complete');
//console.log(completeLink);
var todoSeq = 0;

createButton.click(() => {

  var title = titleInput.val();
  var description = descriptionInput.val();

  if (title.length === 0) { //タイトルが空の時はアラートを表示して処理を終了する
    alert('タイトルを入力してください');
    return;
  }

  // todoを追加

  var newTodo = $('<div></div>');

  var newTitle = $('<p></p>');
  ++todoSeq;
  newTitle.text(`${todoSeq}：${title}`);
  newTodo.append(newTitle);

  var newComplete = $('<a class="complete clickable"></a>');
  newComplete.text('完了！');
  newTodo.append(newComplete);

  var newDescription = $('<p></p>');
  newDescription.text(description);
  newTodo.append(newDescription);

  todoDivided.append(newTodo);

  //completeLink = $('.complete'); //completeLinkを更新
  //console.log(completeLink);

  // 「残り」を一つ増やす

  var restNum = parseInt(restNumDivided.text().split('：')[1]);
  ++restNum;
  restNumDivided.text(`残り：${restNum}`);

});

$(function() {
  $(document).on("click", ".complete", () => {
    
    console.log('完了！がクリックされたよ。');

    // TODO 完了ボタンが押されたTODOを非表示にする
    console.log($(this));
    var todoCard = $(this).parent();
    console.log(todoCard);
    todoCard.hide();

    // TODO 完了ボタンが押されたTODOのタイトルと、「元に戻す」リンクと「削除」リンクを表示する

    // TODO 「完了」を一つ増やす

    // TODO 「残り」を一減らす

    var restNum = parseInt(restNumDivided.text().split('：')[1]);
    --restNum;
    restNumDivided.text(`残り：${restNum}`);

    // TODO レベル欄を更新する

    // var level = parseInt(levelDivided.text().split(' ')[1].split('（')[0]);
  });
});

/*
completeLink.click(() => {
  console.log('完了！がクリックされたよ。');
  alert('完了！がクリックされました。');
});
*/

/*
$(function() {
  $('.complete').click(() => {
    alert('完了！がクリックされました。');
    // var level = parseInt(levelDivided.text().split(' ')[1].split('（')[0]);
  });
});
*/



/*
$(function() {
  $('.complete').click(() => {
    var todoCard = $(this).parent();
    console.log(todoCard);
    var children = todoCard.children();
    console.log(children);
    children.hide();

    // var level = parseInt(levelDivided.text().split(' ')[1].split('（')[0]);
  });
});
*/