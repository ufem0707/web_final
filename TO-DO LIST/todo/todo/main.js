$(function() {
  // 載入 db.json 檔案
  let url = `./db.json?timestamp=${new Date().getTime()}`;
  $.getJSON(url)
    .done(function(data) {
      // 呈現資料到表格
      renderTable(data);
    })
    .fail(function() {
      console.log("Failed to load JSON file.");
    });

  // 更新按鈕事件處理
  $(document).on("click", ".update-btn", function() {
    var row = $(this).closest("tr");
    var task = row.find(".task-input").val();
    var index = row.index();
    
    // 更新資料
    updateTask(index, task);
  });

  // 刪除按鈕事件處理
  $(document).on("click", ".delete-btn", function() {
    var row = $(this).closest("tr");
    var index = row.index();
    
    // 刪除資料
    deleteTask(index);
  });
  
  // 新增按鈕事件處理
  $(document).on("click", ".add-btn", function() {
    var newTask = $("#newTask").val();
    
    // 新增資料
    addTask(newTask);
  });
});

// 呈現資料到表格
function renderTable(data) {
  var table = $("table");
  
  // 清空表格內容
  table.find("tr:gt(0)").remove();

  // 逐一添加每個項目到表格
  data.forEach(function(item, index) {
    var row = $("<tr class='item'>");
    row.append("<td>" + (index + 1) + "</td>");
    row.append('<td><input type="text" class="task-input" value="' + item.task + '"></td>');
    row.append('<td><button class="update-btn">Update</button></td>');
    row.append('<td><button class="delete-btn">Delete</button></td>');
    table.append(row);
  });
}

function updateTask(index, task) {
  $.getJSON("db.json")
    .done(function(data) {
      data[index - 1].task = task;
      saveData(data);
    })
    .fail(function() {
      console.log("Failed to load JSON file.");
    });
}

function deleteTask(index) {
  $.getJSON("db.json")
    .done(function(data) {
      // 刪除資料
      data.splice(index - 1, 1);
      
      // 儲存更新後的資料
      saveData(data);
      
      // 重新呈現表格
      renderTable(data);
    })
    .fail(function() {
      console.log("Failed to load JSON file.");
    });
}

// 新增資料
function addTask(task) {
  $.getJSON("db.json")
    .done(function(data) {
      // 新增資料
      data.push({ task: task });

      // 儲存更新後的資料
      saveData(data);
      renderTable(data);
    })
    .fail(function() {
      console.log("Failed to load JSON file.");
    });
}

// 儲存資料
function saveData(data) {
  console.log(data);
  $.ajax({
    url: "save.php",
    type: "POST",
    data: {
      data: JSON.stringify(data)
    },
    success: function() {
      console.log("Data saved successfully.");
    },
    error: function() {
      console.log("Failed to save data.");
    }
  });
}
