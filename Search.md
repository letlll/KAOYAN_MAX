```dataviewjs
let la = [];
let da = [];

for (let i of dv.pages().groupBy(p => p.file.folder.split("/")[0])) {
    la.push(`"${i.key}"`); // 用引号包裹，防止标签解析错误
    let n = i.rows.length; // 使用分组后的行数
    da.push(n);
}

// 使用 join 方法，确保没有多余的逗号
let labelsString = la.join(", ");
let dataString = da.join(", ");

dv.paragraph(`\`\`\`chart
type: pie
labels: [${labelsString}]
series:
- title: none
  data: [${dataString}]
width: 50%
legendPosition: left
labelColors: true
\`\`\``);

```

> [!example] [[总目录2024]]  [所有未完成任务](obsidian1/Obsidian08/所有未完成任务.md)



> [!example]+ HTML
>```dataview
>list 
>from ""
>where regexmatch("-.*-",file.name)
>and contains(file.path,"HTML")
>sort chapter
>```

>[!example] 
>[[Clippings/收集库]]
>[--图书馆--](图书馆/--图书馆--.md)
>[---资料库导览---](资料库HTML5/---资料库导览---.md)


> [!note]+ 最近编辑
>```dataview
>table WITHOUT ID file.link AS "标题", file.mtime
>from !"模板" and !"kanban"
>where contains(file.tags, "HTML")
>sort file.mtime desc
>Limit 16
>```

> [!tip]+ 参考
> - [[高等数学 第7版 上册 同济大学.pdf]]

