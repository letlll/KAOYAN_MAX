---
Tags:
  - HTML
Dlink:
  - "[[---表格---]]"
---
>[!info] 定义


```latex

\section{附件} 

\begin{lstlisting}[language=HTML,columns=fullflexible, linewidth=\textwidth, breaklines=true] 

<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <title>问卷调查表</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f2f2f2;
            padding: 20px;
        }
        .container {
            background-color: #fff;
            padding: 25px;
            border-radius: 5px;
            max-width: 800px;
            margin: auto;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }
        h2 {
            text-align: center;
            color: #333;
        }
        .form-group {
            margin-bottom: 15px;
        }
        label {
            display: block;
            margin-bottom: 5px;
            color: #555;
        }
        input[type="text"],
        input[type="password"],
        input[type="email"],
        input[type="tel"],
        input[type="number"],
        input[type="url"],
        input[type="date"],
        input[type="time"],
        input[type="color"],
        textarea,
        select {
            width: 100%;
            padding: 8px;
            box-sizing: border-box;
            border: 1px solid #ccc;
            border-radius: 4px;
        }
        input[type="radio"],
        input[type="checkbox"] {
            margin-right: 10px;
        }
        .hint {
            font-size: 0.9em;
            color: #888;
        }
        .error {
            color: red;
            font-size: 0.9em;
        }
        .submit-btn {
            background-color: #4CAF50;
            color: white;
            padding: 10px 15px;
            border: none;
            border-radius: 4px;
            cursor: pointer;
        }
        .submit-btn:hover {
            background-color: #45a049;
        }
    </style>
</head>
<body>

<div class="container">
    <h2>问卷调查表</h2>
    <form id="surveyForm" novalidate>
        <!-- 隐藏字段 -->
        <input type="hidden" name="form_id" value="survey_2024">

        <!-- 单行文本输入 -->
        <div class="form-group">
            <label for="fullname">姓名<span style="color:red;">*</span></label>
            <input type="text" id="fullname" name="fullname" placeholder="请输入您的姓名">
            <div class="error" id="fullnameError"></div>
        </div>

        <!-- 密码输入 -->
        <div class="form-group">
            <label for="password">密码<span style="color:red;">*</span></label>
            <input type="password" id="password" name="password" placeholder="设置密码">
            <div class="error" id="passwordError"></div>
        </div>

        <!-- 邮箱输入 -->
        <div class="form-group">
            <label for="email">邮箱<span style="color:red;">*</span></label>
            <input type="email" id="email" name="email" placeholder="example@domain.com">
            <div class="error" id="emailError"></div>
        </div>

        <!-- 电话号码输入 -->
        <div class="form-group">
            <label for="phone">电话号码<span style="color:red;">*</span></label>
            <input type="tel" id="phone" name="phone" placeholder="例如: 13800138000">
            <div class="error" id="phoneError"></div>
        </div>

        <!-- 单选按钮 -->
        <div class="form-group">
            <label>性别<span style="color:red;">*</span></label>
            <input type="radio" id="genderMale" name="gender" value="male">
            <label for="genderMale" style="display:inline;">男</label>
            <input type="radio" id="genderFemale" name="gender" value="female">
            <label for="genderFemale" style="display:inline;">女</label>
            <div class="error" id="genderError"></div>
        </div>

        <!-- 多选框 -->
        <div class="form-group">
            <label>兴趣爱好<span style="color:red;">*</span></label>
            <input type="checkbox" id="hobbyReading" name="hobbies" value="reading">
            <label for="hobbyReading" style="display:inline;">阅读</label>
            <input type="checkbox" id="hobbyTraveling" name="hobbies" value="traveling">
            <label for="hobbyTraveling" style="display:inline;">旅行</label>
            <input type="checkbox" id="hobbyGaming" name="hobbies" value="gaming">
            <label for="hobbyGaming" style="display:inline;">游戏</label>
            <div class="error" id="hobbiesError"></div>
        </div>

        <!-- 下拉选择框 -->
        <div class="form-group">
            <label for="country">所在国家<span style="color:red;">*</span></label>
            <select id="country" name="country">
                <option value="">请选择国家</option>
                <option value="china">中国</option>
                <option value="usa">美国</option>
                <option value="uk">英国</option>
                <option value="canada">加拿大</option>
                <option value="australia">澳大利亚</option>
            </select>
            <div class="error" id="countryError"></div>
        </div>

        <!-- 多行文字输入 -->
        <div class="form-group">
            <label for="about">自我介绍<span style="color:red;">*</span></label>
            <textarea id="about" name="about" rows="4" placeholder="请简单介绍一下自己"></textarea>
            <div class="error" id="aboutError"></div>
        </div>

        <!-- 文件上传 -->
        <div class="form-group">
            <label for="resume">上传简历<span style="color:red;">*</span></label>
            <input type="file" id="resume" name="resume" accept=".pdf,.doc,.docx">
            <div class="error" id="resumeError"></div>
        </div>

        <!-- 日期选择 -->
        <div class="form-group">
            <label for="birthday">生日<span style="color:red;">*</span></label>
            <input type="date" id="birthday" name="birthday">
            <div class="error" id="birthdayError"></div>
        </div>

        <!-- 时间选择 -->
        <div class="form-group">
            <label for="appointment">预约时间<span style="color:red;">*</span></label>
            <input type="time" id="appointment" name="appointment">
            <div class="error" id="appointmentError"></div>
        </div>

        <!-- URL输入 -->
        <div class="form-group">
            <label for="website">个人网站</label>
            <input type="url" id="website" name="website" placeholder="https://example.com">
            <div class="error" id="websiteError"></div>
        </div>

        <!-- 颜色选择 -->
        <div class="form-group">
            <label for="favoriteColor">喜欢的颜色<span style="color:red;">*</span></label>
            <input type="color" id="favoriteColor" name="favoriteColor" value="#ff0000">
            <div class="error" id="favoriteColorError"></div>
        </div>

        <!-- 数字输入 -->
        <div class="form-group">
            <label for="age">年龄<span style="color:red;">*</span></label>
            <input type="number" id="age" name="age" min="1" max="120" placeholder="请输入您的年龄">
            <div class="error" id="ageError"></div>
        </div>

        <!-- 提交按钮 -->
        <div class="form-group">
            <button type="submit" class="submit-btn">提交</button>
        </div>
    </form>
</div>

<script>
    document.getElementById('surveyForm').addEventListener('submit', function(event) {
        event.preventDefault(); // 阻止默认提交

        // 清除之前的错误信息
        const errors = document.querySelectorAll('.error');
        errors.forEach(error => error.textContent = '');

        let isValid = true;

        // 姓名验证
        const fullname = document.getElementById('fullname').value.trim();
        if (fullname === '') {
            isValid = false;
            document.getElementById('fullnameError').textContent = '姓名不能为空。';
        }

        // 密码验证 (至少6位，包含字母和数字)
        const password = document.getElementById('password').value;
        const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;
        if (!passwordRegex.test(password)) {
            isValid = false;
            document.getElementById('passwordError').textContent = '密码至少6位，包含字母和数字。';
        }

        // 邮箱验证
        const email = document.getElementById('email').value.trim();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            isValid = false;
            document.getElementById('emailError').textContent = '请输入有效的邮箱地址。';
        }

        // 电话号码验证 (中国大陆号码)
        const phone = document.getElementById('phone').value.trim();
        const phoneRegex = /^1[3-9]\d{9}$/;
        if (!phoneRegex.test(phone)) {
            isValid = false;
            document.getElementById('phoneError').textContent = '请输入有效的电话号码。';
        }

        // 性别验证
        const gender = document.querySelector('input[name="gender"]:checked');
        if (!gender) {
            isValid = false;
            document.getElementById('genderError').textContent = '请选择性别。';
        }

        // 兴趣爱好验证
        const hobbies = document.querySelectorAll('input[name="hobbies"]:checked');
        if (hobbies.length === 0) {
            isValid = false;
            document.getElementById('hobbiesError').textContent = '请选择至少一个兴趣爱好。';
        }

        // 所在国家验证
        const country = document.getElementById('country').value;
        if (country === '') {
            isValid = false;
            document.getElementById('countryError').textContent = '请选择所在国家。';
        }

        // 自我介绍验证
        const about = document.getElementById('about').value.trim();
        if (about === '') {
            isValid = false;
            document.getElementById('aboutError').textContent = '自我介绍不能为空。';
        }

        // 文件上传验证
        const resume = document.getElementById('resume').files.length;
        if (resume === 0) {
            isValid = false;
            document.getElementById('resumeError').textContent = '请上传您的简历。';
        }

        // 生日验证
        const birthday = document.getElementById('birthday').value;
        if (birthday === '') {
            isValid = false;
            document.getElementById('birthdayError').textContent = '请选择生日。';
        }

        // 预约时间验证
        const appointment = document.getElementById('appointment').value;
        if (appointment === '') {
            isValid = false;
            document.getElementById('appointmentError').textContent = '请选择预约时间。';
        }

        // 个人网站验证 (可选)
        const website = document.getElementById('website').value.trim();
        if (website !== '') {
            const urlRegex = /^(https?:\/\/)?([\w-]+(\.[\w-]+)+)\/?/;
            if (!urlRegex.test(website)) {
                isValid = false;
                document.getElementById('websiteError').textContent = '请输入有效的URL。';
            }
        }

        // 喜欢的颜色验证
        const favoriteColor = document.getElementById('favoriteColor').value;
        if (favoriteColor === '') {
            isValid = false;
            document.getElementById('favoriteColorError').textContent = '请选择喜欢的颜色。';
        }

        // 年龄验证
        const age = document.getElementById('age').value;
        if (age === '' || age < 1 || age > 120) {
            isValid = false;
            document.getElementById('ageError').textContent = '请输入有效的年龄。';
        }

        if (isValid) {
            alert('表单提交成功！');
            // 此处可以添加实际的表单提交逻辑
            // 例如使用 AJAX 提交表单数据
            // this.submit();
        } else {
            alert('请修正表单中的错误后再提交。');
        }
    });
</script>

</body>
</html>

\end{lstlisting}

```



```latex




<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <title>问卷调查表</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f2f2f2;
            padding: 20px;
        }
        .container {
            background-color: #fff;
            padding: 25px;
            border-radius: 5px;
            max-width: 800px;
            margin: auto;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }
        h2 {
            text-align: center;
            color: #333;
        }
        .form-group {
            margin-bottom: 15px;
        }
        label {
            display: block;
            margin-bottom: 5px;
            color: #555;
        }
        input[type="text"],
        input[type="password"],
        input[type="email"],
        input[type="tel"],
        input[type="number"],
        input[type="url"],
        input[type="date"],
        input[type="time"],
        input[type="color"],
        textarea,
        select {
            width: 100%;
            padding: 8px;
            box-sizing: border-box;
            border: 1px solid #ccc;
            border-radius: 4px;
        }
        input[type="radio"],
        input[type="checkbox"] {
            margin-right: 10px;
        }
        .hint {
            font-size: 0.9em;
            color: #888;
        }
        .error {
            color: red;
            font-size: 0.9em;
        }
        .submit-btn {
            background-color: #4CAF50;
            color: white;
            padding: 10px 15px;
            border: none;
            border-radius: 4px;
            cursor: pointer;
        }
        .submit-btn:hover {
            background-color: #45a049;
        }
    </style>
</head>
<body>

<div class="container">
    <h2>问卷调查表</h2>
    <form id="surveyForm" novalidate>
        <!-- 隐藏字段 -->
        <input type="hidden" name="form_id" value="survey_2024">

        <!-- 单行文本输入 -->
        <div class="form-group">
            <label for="fullname">姓名<span style="color:red;">*</span></label>
            <input type="text" id="fullname" name="fullname" placeholder="请输入您的姓名">
            <div class="error" id="fullnameError"></div>
        </div>

        <!-- 密码输入 -->
        <div class="form-group">
            <label for="password">密码<span style="color:red;">*</span></label>
            <input type="password" id="password" name="password" placeholder="设置密码">
            <div class="error" id="passwordError"></div>
        </div>

        <!-- 邮箱输入 -->
        <div class="form-group">
            <label for="email">邮箱<span style="color:red;">*</span></label>
            <input type="email" id="email" name="email" placeholder="example@domain.com">
            <div class="error" id="emailError"></div>
        </div>

        <!-- 电话号码输入 -->
        <div class="form-group">
            <label for="phone">电话号码<span style="color:red;">*</span></label>
            <input type="tel" id="phone" name="phone" placeholder="例如: 13800138000">
            <div class="error" id="phoneError"></div>
        </div>

        <!-- 单选按钮 -->
        <div class="form-group">
            <label>性别<span style="color:red;">*</span></label>
            <input type="radio" id="genderMale" name="gender" value="male">
            <label for="genderMale" style="display:inline;">男</label>
            <input type="radio" id="genderFemale" name="gender" value="female">
            <label for="genderFemale" style="display:inline;">女</label>
            <div class="error" id="genderError"></div>
        </div>

        <!-- 多选框 -->
        <div class="form-group">
            <label>兴趣爱好<span style="color:red;">*</span></label>
            <input type="checkbox" id="hobbyReading" name="hobbies" value="reading">
            <label for="hobbyReading" style="display:inline;">阅读</label>
            <input type="checkbox" id="hobbyTraveling" name="hobbies" value="traveling">
            <label for="hobbyTraveling" style="display:inline;">旅行</label>
            <input type="checkbox" id="hobbyGaming" name="hobbies" value="gaming">
            <label for="hobbyGaming" style="display:inline;">游戏</label>
            <div class="error" id="hobbiesError"></div>
        </div>

        <!-- 下拉选择框 -->
        <div class="form-group">
            <label for="country">所在国家<span style="color:red;">*</span></label>
            <select id="country" name="country">
                <option value="">请选择国家</option>
                <option value="china">中国</option>
                <option value="usa">美国</option>
                <option value="uk">英国</option>
                <option value="canada">加拿大</option>
                <option value="australia">澳大利亚</option>
            </select>
            <div class="error" id="countryError"></div>
        </div>

        <!-- 多行文字输入 -->
        <div class="form-group">
            <label for="about">自我介绍<span style="color:red;">*</span></label>
            <textarea id="about" name="about" rows="4" placeholder="请简单介绍一下自己"></textarea>
            <div class="error" id="aboutError"></div>
        </div>

        <!-- 文件上传 -->
        <div class="form-group">
            <label for="resume">上传简历<span style="color:red;">*</span></label>
            <input type="file" id="resume" name="resume" accept=".pdf,.doc,.docx">
            <div class="error" id="resumeError"></div>
        </div>

        <!-- 日期选择 -->
        <div class="form-group">
            <label for="birthday">生日<span style="color:red;">*</span></label>
            <input type="date" id="birthday" name="birthday">
            <div class="error" id="birthdayError"></div>
        </div>

        <!-- 时间选择 -->
        <div class="form-group">
            <label for="appointment">预约时间<span style="color:red;">*</span></label>
            <input type="time" id="appointment" name="appointment">
            <div class="error" id="appointmentError"></div>
        </div>

        <!-- URL输入 -->
        <div class="form-group">
            <label for="website">个人网站</label>
            <input type="url" id="website" name="website" placeholder="https://example.com">
            <div class="error" id="websiteError"></div>
        </div>

        <!-- 颜色选择 -->
        <div class="form-group">
            <label for="favoriteColor">喜欢的颜色<span style="color:red;">*</span></label>
            <input type="color" id="favoriteColor" name="favoriteColor" value="#ff0000">
            <div class="error" id="favoriteColorError"></div>
        </div>

        <!-- 数字输入 -->
        <div class="form-group">
            <label for="age">年龄<span style="color:red;">*</span></label>
            <input type="number" id="age" name="age" min="1" max="120" placeholder="请输入您的年龄">
            <div class="error" id="ageError"></div>
        </div>

        <!-- 提交按钮 -->
        <div class="form-group">
            <button type="submit" class="submit-btn">提交</button>
        </div>
    </form>
</div>

<script>
    document.getElementById('surveyForm').addEventListener('submit', function(event) {
        event.preventDefault(); // 阻止默认提交

        // 清除之前的错误信息
        const errors = document.querySelectorAll('.error');
        errors.forEach(error => error.textContent = '');

        let isValid = true;

        // 姓名验证
        const fullname = document.getElementById('fullname').value.trim();
        if (fullname === '') {
            isValid = false;
            document.getElementById('fullnameError').textContent = '姓名不能为空。';
        }

        // 密码验证 (至少6位，包含字母和数字)
        const password = document.getElementById('password').value;
        const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;
        if (!passwordRegex.test(password)) {
            isValid = false;
            document.getElementById('passwordError').textContent = '密码至少6位，包含字母和数字。';
        }

        // 邮箱验证
        const email = document.getElementById('email').value.trim();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            isValid = false;
            document.getElementById('emailError').textContent = '请输入有效的邮箱地址。';
        }

        // 电话号码验证 (中国大陆号码)
        const phone = document.getElementById('phone').value.trim();
        const phoneRegex = /^1[3-9]\d{9}$/;
        if (!phoneRegex.test(phone)) {
            isValid = false;
            document.getElementById('phoneError').textContent = '请输入有效的电话号码。';
        }

        // 性别验证
        const gender = document.querySelector('input[name="gender"]:checked');
        if (!gender) {
            isValid = false;
            document.getElementById('genderError').textContent = '请选择性别。';
        }

        // 兴趣爱好验证
        const hobbies = document.querySelectorAll('input[name="hobbies"]:checked');
        if (hobbies.length === 0) {
            isValid = false;
            document.getElementById('hobbiesError').textContent = '请选择至少一个兴趣爱好。';
        }

        // 所在国家验证
        const country = document.getElementById('country').value;
        if (country === '') {
            isValid = false;
            document.getElementById('countryError').textContent = '请选择所在国家。';
        }

        // 自我介绍验证
        const about = document.getElementById('about').value.trim();
        if (about === '') {
            isValid = false;
            document.getElementById('aboutError').textContent = '自我介绍不能为空。';
        }

        // 文件上传验证
        const resume = document.getElementById('resume').files.length;
        if (resume === 0) {
            isValid = false;
            document.getElementById('resumeError').textContent = '请上传您的简历。';
        }

        // 生日验证
        const birthday = document.getElementById('birthday').value;
        if (birthday === '') {
            isValid = false;
            document.getElementById('birthdayError').textContent = '请选择生日。';
        }

        // 预约时间验证
        const appointment = document.getElementById('appointment').value;
        if (appointment === '') {
            isValid = false;
            document.getElementById('appointmentError').textContent = '请选择预约时间。';
        }

        // 个人网站验证 (可选)
        const website = document.getElementById('website').value.trim();
        if (website !== '') {
            const urlRegex = /^(https?:\/\/)?([\w-]+(\.[\w-]+)+)\/?/;
            if (!urlRegex.test(website)) {
                isValid = false;
                document.getElementById('websiteError').textContent = '请输入有效的URL。';
            }
        }

        // 喜欢的颜色验证
        const favoriteColor = document.getElementById('favoriteColor').value;
        if (favoriteColor === '') {
            isValid = false;
            document.getElementById('favoriteColorError').textContent = '请选择喜欢的颜色。';
        }

        // 年龄验证
        const age = document.getElementById('age').value;
        if (age === '' || age < 1 || age > 120) {
            isValid = false;
            document.getElementById('ageError').textContent = '请输入有效的年龄。';
        }

        if (isValid) {
            alert('表单提交成功！');
            // 此处可以添加实际的表单提交逻辑
            // 例如使用 AJAX 提交表单数据
            // this.submit();
        } else {
            alert('请修正表单中的错误后再提交。');
        }
    });
</script>

</body>
</html>
```