'use strict';
import $ from 'jquery';
const completeNumDivided = $('#complete-num');
const restNumDivided = $('#rest-num');
const levelDivided = $('#level');
const titleInput = $('#title-input');
const descriptionInput = $('#description-input');
const createButton = $('#create-button');
const todoDivided = $('#todo-area');
var todoSeq = 0;

// 「todoを作成」ボタン押下時に発火する処理
createButton.click(() => {

  var title = titleInput.val();
  var description = descriptionInput.val();

  if (title.length === 0) { //タイトルが空の時はアラートを表示して処理を終了する
    alert('タイトルを入力してください');
    return;
  }

  // todoを追加

  var newTodo = $('<div class="todo-card"></div>');

  var newTitle = $('<p class="title"></p>');
  ++todoSeq;
  newTitle.text(`${todoSeq}：${title}`);
  newTodo.append(newTitle);

  var newComplete = $('<a class="complete clickable">完了！</a>');
  newTodo.append(newComplete);

  var newDescription = $('<p class="description"></p>');
  newDescription.text(description);
  newTodo.append(newDescription);

  todoDivided.append(newTodo);

  // 「残り」を一つ増やす

  var restNum = parseInt(restNumDivided.text().split('：')[1]);
  ++restNum;
  restNumDivided.text(`残り：${restNum}`);

  // todoタイトル入力欄とtodo説明入力欄の文字列を消去
  
  titleInput.val('');
  descriptionInput.val('');

});

// 「完了！」リンク押下時に発火する処理
$(function() {
  $(document).on("click", ".complete", (event) => {

    // 完了ボタンが押されたTODOを非表示にする

    var completeButton = $(event.currentTarget);
    var todoCard = completeButton.parent();
    todoCard.hide();

    // 完了ボタンが押されたTODOのタイトルと、「元に戻す」リンクと「削除」リンクを表示する

    var confirmCard = $('<div class="confirm-card"></div>');

    var todoTitle = $('<p class="confirm-title"></p>');
    var todoTitleText = completeButton.prev().text();
    todoTitle.text(todoTitleText);
    confirmCard.append(todoTitle);

    var undoLink = $('<a class="undo clickable">元に戻す</a>');
    undoLink.text();
    confirmCard.append(undoLink);

    var deleteLink = $('<a class="delete clickable">削除</a>');
    confirmCard.append(deleteLink);

    todoCard.after(confirmCard);

    // 「完了」を一つ増やす

    var completeNum = parseInt(completeNumDivided.text().split('：')[1]);
    ++completeNum;
    completeNumDivided.text(`完了：${completeNum}`);

    // 「残り」を一減らす

    var restNum = parseInt(restNumDivided.text().split('：')[1]);
    --restNum;
    restNumDivided.text(`残り：${restNum}`);

    // レベル欄を更新する

    var level = parseInt(levelDivided.text().split(' ')[1].split('（')[0]);
    var toTheNextLevel = parseInt(levelDivided.text().split('（次のレベルまで')[1].split('）')[0]);
    if (toTheNextLevel - 1 === 0) {
      ++level;
      toTheNextLevel = level;
    } else {
      --toTheNextLevel;
    }
    levelDivided.text(`Lv. ${level}（次のレベルまで${toTheNextLevel}）`);

  });
});

// 「元に戻す」リンク押下時に発火する処理
$(function() {
  $(document).on("click", ".undo", (event) => {

    // 「元に戻す」ボタンが押されたTODOを再表示し、confirmCardを削除
    
    var undoLink = $(event.currentTarget);
    var confirmCard = undoLink.parent();
    var todoCard = confirmCard.prev();
    todoCard.show();
    confirmCard.remove();

    // 「完了」を一つ減らす

    var completeNum = parseInt(completeNumDivided.text().split('：')[1]);
    --completeNum;
    completeNumDivided.text(`完了：${completeNum}`);

    // 「残り」を一増やす

    var restNum = parseInt(restNumDivided.text().split('：')[1]);
    ++restNum;
    restNumDivided.text(`残り：${restNum}`);

    // レベル欄を更新する

    var level = parseInt(levelDivided.text().split(' ')[1].split('（')[0]);
    var toTheNextLevel = parseInt(levelDivided.text().split('（次のレベルまで')[1].split('）')[0]);
    if (toTheNextLevel === level) {
      --level;
      toTheNextLevel = 1;
    } else {
      ++toTheNextLevel;
    }
    levelDivided.text(`Lv. ${level}（次のレベルまで${toTheNextLevel}）`);

  });
});

// 「削除」リンク押下時に発火する処理
$(function() {
  $(document).on("click", ".delete", (event) => {

    // 「元に戻す」ボタンが押されたTODOを再表示し、confirmCardを削除
    
    var deleteLink = $(event.currentTarget);
    var confirmCard = deleteLink.parent();
    var todoCard = confirmCard.prev();
    todoCard.remove();
    confirmCard.remove();

  });
});