---
title: "HTML Standard"
source: "https://html.spec.whatwg.org/multipage/dnd.html#the-datatransfer-interface"
author:
published:
created: 2024-11-23
description:
tags:
  - "clippings"
---
[![WHATWG](https://resources.whatwg.org/logo.svg)](https://whatwg.org/)

Living Standard — Last Updated 22 November 2024

[← 6 User interaction](https://html.spec.whatwg.org/multipage/interaction.html) — [Table of Contents](https://html.spec.whatwg.org/multipage/) — [6.12 The popover attribute →](https://html.spec.whatwg.org/multipage/popover.html)

1. 1. [6.11 Drag and drop](https://html.spec.whatwg.org/multipage/dnd.html#dnd)
1. [6.11.1 Introduction](https://html.spec.whatwg.org/multipage/dnd.html#event-drag)
2. [6.11.2 The drag data store](https://html.spec.whatwg.org/multipage/dnd.html#the-drag-data-store)
3. [6.11.3 The `DataTransfer` interface](https://html.spec.whatwg.org/multipage/dnd.html#the-datatransfer-interface)
1. [6.11.3.1 The `DataTransferItemList` interface](https://html.spec.whatwg.org/multipage/dnd.html#the-datatransferitemlist-interface)
2. [6.11.3.2 The `DataTransferItem` interface](https://html.spec.whatwg.org/multipage/dnd.html#the-datatransferitem-interface)
4. [6.11.4 The `DragEvent` interface](https://html.spec.whatwg.org/multipage/dnd.html#the-dragevent-interface)
5. [6.11.5 Processing model](https://html.spec.whatwg.org/multipage/dnd.html#drag-and-drop-processing-model)
6. [6.11.6 Events summary](https://html.spec.whatwg.org/multipage/dnd.html#dndevents)
7. [6.11.7 The `draggable` attribute](https://html.spec.whatwg.org/multipage/dnd.html#the-draggable-attribute)
8. [6.11.8 Security risks in the drag-and-drop model](https://html.spec.whatwg.org/multipage/dnd.html#security-risks-in-the-drag-and-drop-model)

### 6.11 Drag and drop[HTML\_Drag\_and\_Drop\_API](https://developer.mozilla.org/en-US/docs/Web/API/HTML_Drag_and_Drop_API "HTML Drag and Drop interfaces enable applications to use drag-and-drop features in browsers.")

Support in all current engines.

Firefox3.5+Safari3.1+Chrome4+

---

Opera12+Edge79+

---

Edge (Legacy)18Internet Explorer5.5+

---

Firefox Android4+Safari iOS2+Chrome Android18+WebView Android4.4+Samsung Internet1.5+Opera Android14+

This section defines an event-based drag-and-drop mechanism.

This specification does not define exactly what a *drag-and-drop operation* actually is.

On a visual medium with a pointing device, a drag operation could be the default action of a `[mousedown](https://w3c.github.io/uievents/#event-type-mousedown)` event that is followed by a series of `[mousemove](https://w3c.github.io/uievents/#event-type-mousemove)` events, and the drop could be triggered by the mouse being released.

When using an input modality other than a pointing device, users would probably have to explicitly indicate their intention to perform a drag-and-drop operation, stating what they wish to drag and where they wish to drop it, respectively.

However it is implemented, drag-and-drop operations must have a starting point (e.g. where the mouse was clicked, or the start of the selection or element that was selected for the drag), may have any number of intermediate steps (elements that the mouse moves over during a drag, or elements that the user picks as possible drop points as they cycle through possibilities), and must either have an end point (the element above which the mouse button was released, or the element that was finally selected), or be canceled. The end point must be the last element selected as a possible drop point before the drop occurs (so if the operation is not canceled, there must be at least one element in the middle step).

#### 6.11.1 Introduction*This section is non-normative.*

To make an element draggable, give the element a `[draggable](https://html.spec.whatwg.org/multipage/#attr-draggable)` attribute, and set an event listener for `[dragstart](https://html.spec.whatwg.org/multipage/#event-dnd-dragstart)` that stores the data being dragged.

The event handler typically needs to check that it's not a text selection that is being dragged, and then needs to store data into the `[DataTransfer](https://html.spec.whatwg.org/multipage/#datatransfer)` object and set the allowed effects (copy, move, link, or some combination).

For example:

```
<p>What fruits do you like?</p>
<ol ondragstart="dragStartHandler(event)">
 <li draggable="true" data-value="fruit-apple">Apples</li>
 <li draggable="true" data-value="fruit-orange">Oranges</li>
 <li draggable="true" data-value="fruit-pear">Pears</li>
</ol>
<script>
  var internalDNDType = 'text/x-example'; // set this to something specific to your site
  function dragStartHandler(event) {
    if (event.target instanceof HTMLLIElement) {
      // use the element's data-value="" attribute as the value to be moving:
      event.dataTransfer.setData(internalDNDType, event.target.dataset.value);
      event.dataTransfer.effectAllowed = 'move'; // only allow moves
    } else {
      event.preventDefault(); // don't allow selection to be dragged
    }
  }
</script>
```

---

To accept a drop, the drop target has to listen to the following events:

1. The `[dragenter](https://html.spec.whatwg.org/multipage/#event-dnd-dragenter)` event handler reports whether or not the drop target is potentially willing to accept the drop, by canceling the event.
2. The `[dragover](https://html.spec.whatwg.org/multipage/#event-dnd-dragover)` event handler specifies what feedback will be shown to the user, by setting the `[dropEffect](https://html.spec.whatwg.org/multipage/#dom-datatransfer-dropeffect)` attribute of the `[DataTransfer](https://html.spec.whatwg.org/multipage/#datatransfer)` associated with the event. This event also needs to be canceled.
3. The `[drop](https://html.spec.whatwg.org/multipage/#event-dnd-drop)` event handler has a final chance to accept or reject the drop. If the drop is accepted, the event handler must perform the drop operation on the target. This event needs to be canceled, so that the `[dropEffect](https://html.spec.whatwg.org/multipage/#dom-datatransfer-dropeffect)` attribute's value can be used by the source. Otherwise, the drop operation is rejected.

For example:

```
<p>Drop your favorite fruits below:</p>
<ol ondragenter="dragEnterHandler(event)" ondragover="dragOverHandler(event)"
    ondrop="dropHandler(event)">
</ol>
<script>
  var internalDNDType = 'text/x-example'; // set this to something specific to your site
  function dragEnterHandler(event) {
    var items = event.dataTransfer.items;
    for (var i = 0; i < items.length; ++i) {
      var item = items[i];
      if (item.kind == 'string' && item.type == internalDNDType) {
        event.preventDefault();
        return;
      }
    }
  }
  function dragOverHandler(event) {
    event.dataTransfer.dropEffect = 'move';
    event.preventDefault();
  }
  function dropHandler(event) {
    var li = document.createElement('li');
    var data = event.dataTransfer.getData(internalDNDType);
    if (data == 'fruit-apple') {
      li.textContent = 'Apples';
    } else if (data == 'fruit-orange') {
      li.textContent = 'Oranges';
    } else if (data == 'fruit-pear') {
      li.textContent = 'Pears';
    } else {
      li.textContent = 'Unknown Fruit';
    }
    event.target.appendChild(li);
  }
</script>
```

---

To remove the original element (the one that was dragged) from the display, the `[dragend](https://html.spec.whatwg.org/multipage/#event-dnd-dragend)` event can be used.

For our example here, that means updating the original markup to handle that event:

```
<p>What fruits do you like?</p>
<ol ondragstart="dragStartHandler(event)" ondragend="dragEndHandler(event)">
 ...as before...
</ol>
<script>
  function dragStartHandler(event) {
    // ...as before...
  }
  function dragEndHandler(event) {
    if (event.dataTransfer.dropEffect == 'move') {
      // remove the dragged element
      event.target.parentNode.removeChild(event.target);
    }
  }
</script>
```

#### 6.11.2 The drag data storeThe data that underlies a drag-and-drop operation, known as the drag data store, consists of the following information:

- A drag data store item list, which is a list of items representing the dragged data, each consisting of the following information:

The drag data item kind

The kind of data:

*Text*

Text.

*File*

Binary data with a filename.

The drag data item type string

A Unicode string giving the type or format of the data, generally given by a [MIME type](https://mimesniff.spec.whatwg.org/#mime-type). Some values that are not [MIME types](https://mimesniff.spec.whatwg.org/#mime-type) are special-cased for legacy reasons. The API does not enforce the use of [MIME types](https://mimesniff.spec.whatwg.org/#mime-type); other values can be used as well. In all cases, however, the values are all [converted to ASCII lowercase](https://infra.spec.whatwg.org/#ascii-lowercase) by the API.

There is a limit of one *text* item per [item type string](https://html.spec.whatwg.org/multipage/#the-drag-data-item-type-string).

The actual data

A Unicode or binary string, in some cases with a filename (itself a Unicode string), as per [the drag data item kind](https://html.spec.whatwg.org/multipage/#the-drag-data-item-kind).

The [drag data store item list](https://html.spec.whatwg.org/multipage/#drag-data-store-item-list) is ordered in the order that the items were added to the list; most recently added last.
- The following information, used to generate the UI feedback during the drag:

- User-agent-defined default feedback information, known as the drag data store default feedback.
- Optionally, a bitmap image and the coordinate of a point within that image, known as the drag data store bitmap and drag data store hot spot coordinate.
- A drag data store mode, which is one of the following:

Read/write mode

For the `[dragstart](https://html.spec.whatwg.org/multipage/#event-dnd-dragstart)` event. New data can be added to the [drag data store](https://html.spec.whatwg.org/multipage/#drag-data-store).

Read-only mode

For the `[drop](https://html.spec.whatwg.org/multipage/#event-dnd-drop)` event. The list of items representing dragged data can be read, including the data. No new data can be added.

Protected mode

For all other events. The formats and kinds in the [drag data store](https://html.spec.whatwg.org/multipage/#drag-data-store) list of items representing dragged data can be enumerated, but the data itself is unavailable and no new data can be added.
- A drag data store allowed effects state, which is a string.

When a [drag data store](https://html.spec.whatwg.org/multipage/#drag-data-store) is created, it must be initialized such that its [drag data store item list](https://html.spec.whatwg.org/multipage/#drag-data-store-item-list) is empty, it has no [drag data store default feedback](https://html.spec.whatwg.org/multipage/#drag-data-store-default-feedback), it has no [drag data store bitmap](https://html.spec.whatwg.org/multipage/#drag-data-store-bitmap) and [drag data store hot spot coordinate](https://html.spec.whatwg.org/multipage/#drag-data-store-hot-spot-coordinate), its [drag data store mode](https://html.spec.whatwg.org/multipage/#drag-data-store-mode) is [protected mode](https://html.spec.whatwg.org/multipage/#concept-dnd-p), and its [drag data store allowed effects state](https://html.spec.whatwg.org/multipage/#drag-data-store-allowed-effects-state) is the string "`[uninitialized](https://html.spec.whatwg.org/multipage/#dom-datatransfer-effectallowed-uninitialized)`".

#### 6.11.3 The `[DataTransfer](https://html.spec.whatwg.org/multipage/#datatransfer)` interface[DataTransfer](https://developer.mozilla.org/en-US/docs/Web/API/DataTransfer "The DataTransfer object is used to hold the data that is being dragged during a drag and drop operation. It may hold one or more data items, each of one or more data types. For more information about drag and drop, see HTML Drag and Drop API.")

Support in all current engines.

Firefox3.5+Safari4+Chrome3+

---

Opera12+Edge79+

---

Edge (Legacy)12+Internet Explorer8+

---

Firefox Android?Safari iOS?Chrome Android?WebView Android37+Samsung Internet?Opera Android12+

`[DataTransfer](https://html.spec.whatwg.org/multipage/#datatransfer)` objects are used to expose the [drag data store](https://html.spec.whatwg.org/multipage/#drag-data-store) that underlies a drag-and-drop operation.

```
[Exposed=Window]
interface DataTransfer {
  constructor();

  attribute DOMString dropEffect;
  attribute DOMString effectAllowed;

  [SameObject] readonly attribute DataTransferItemList items;

  undefined setDragImage(Element image, long x, long y);

  /* old interface */
  readonly attribute FrozenArray<DOMString> types;
  DOMString getData(DOMString format);
  undefined setData(DOMString format, DOMString data);
  undefined clearData(optional DOMString format);
  [SameObject] readonly attribute FileList files;
};
```

`dataTransfer = new [DataTransfer](https://html.spec.whatwg.org/multipage/#dom-datatransfer)()`

[DataTransfer/DataTransfer](https://developer.mozilla.org/en-US/docs/Web/API/DataTransfer/DataTransfer "The DataTransfer constructor creates a new DataTransfer object instance.")

Support in all current engines.

Firefox62+Safari14.1+Chrome59+

---

Opera?Edge79+

---

Edge (Legacy)17+Internet ExplorerNo

---

Firefox Android?Safari iOS?Chrome Android?WebView Android?Samsung Internet8.0+Opera Android44+

Creates a new `[DataTransfer](https://html.spec.whatwg.org/multipage/#datatransfer)` object with an empty [drag data store](https://html.spec.whatwg.org/multipage/#drag-data-store).

`dataTransfer.[dropEffect](https://html.spec.whatwg.org/multipage/#dom-datatransfer-dropeffect) [ = value ]`

[DataTransfer/dropEffect](https://developer.mozilla.org/en-US/docs/Web/API/DataTransfer/dropEffect "The DataTransfer.dropEffect property controls the feedback (typically visual) the user is given during a drag and drop operation. It will affect which cursor is displayed while dragging. For example, when the user hovers over a target drop element, the browser's cursor may indicate which type of operation will occur.")

Support in all current engines.

Firefox3.5+Safari4+Chrome3+

---

Opera12.1+Edge79+

---

Edge (Legacy)12+Internet Explorer8+

---

Firefox Android?Safari iOS?Chrome Android?WebView Android37+Samsung Internet?Opera Android12.1+

Returns the kind of operation that is currently selected. If the kind of operation isn't one of those that is allowed by the `[effectAllowed](https://html.spec.whatwg.org/multipage/#dom-datatransfer-effectallowed)` attribute, then the operation will fail.

Can be set, to change the selected operation.

The possible values are "`[none](https://html.spec.whatwg.org/multipage/#dom-datatransfer-dropeffect-none)`", "`[copy](https://html.spec.whatwg.org/multipage/#dom-datatransfer-dropeffect-copy)`", "`[link](https://html.spec.whatwg.org/multipage/#dom-datatransfer-dropeffect-link)`", and "`[move](https://html.spec.whatwg.org/multipage/#dom-datatransfer-dropeffect-move)`".

`dataTransfer.[effectAllowed](https://html.spec.whatwg.org/multipage/#dom-datatransfer-effectallowed) [ = value ]`

[DataTransfer/effectAllowed](https://developer.mozilla.org/en-US/docs/Web/API/DataTransfer/effectAllowed "The DataTransfer.effectAllowed property specifies the effect that is allowed for a drag operation. The copy operation is used to indicate that the data being dragged will be copied from its present location to the drop location. The move operation is used to indicate that the data being dragged will be moved, and the link operation is used to indicate that some form of relationship or connection will be created between the source and drop locations.")

Support in all current engines.

Firefox3.5+Safari4+Chrome3+

---

Opera12.1+Edge79+

---

Edge (Legacy)12+Internet Explorer8+

---

Firefox Android?Safari iOS?Chrome Android?WebView Android37+Samsung Internet?Opera Android12.1+

Returns the kinds of operations that are to be allowed.

Can be set (during the `[dragstart](https://html.spec.whatwg.org/multipage/#event-dnd-dragstart)` event), to change the allowed operations.

The possible values are "`[none](https://html.spec.whatwg.org/multipage/#dom-datatransfer-effectallowed-none)`", "`[copy](https://html.spec.whatwg.org/multipage/#dom-datatransfer-effectallowed-copy)`", "`[copyLink](https://html.spec.whatwg.org/multipage/#dom-datatransfer-effectallowed-copylink)`", "`[copyMove](https://html.spec.whatwg.org/multipage/#dom-datatransfer-effectallowed-copymove)`", "`[link](https://html.spec.whatwg.org/multipage/#dom-datatransfer-effectallowed-link)`", "`[linkMove](https://html.spec.whatwg.org/multipage/#dom-datatransfer-effectallowed-linkmove)`", "`[move](https://html.spec.whatwg.org/multipage/#dom-datatransfer-effectallowed-move)`", "`[all](https://html.spec.whatwg.org/multipage/#dom-datatransfer-effectallowed-all)`", and "`[uninitialized](https://html.spec.whatwg.org/multipage/#dom-datatransfer-effectallowed-uninitialized)`",

`dataTransfer.[items](https://html.spec.whatwg.org/multipage/#dom-datatransfer-items)`

[DataTransfer/items](https://developer.mozilla.org/en-US/docs/Web/API/DataTransfer/items "The read-only DataTransfer property items property is a list of the data transfer items in a drag operation. The list includes one item for each item in the operation and if the operation had no items, the list is empty.")

Support in all current engines.

Firefox50+Safari11.1+Chrome3+

---

Opera12+Edge79+

---

Edge (Legacy)12+Internet ExplorerNo

---

Firefox Android52+Safari iOS?Chrome Android?WebView Android37+Samsung Internet?Opera Android12+

Returns a `[DataTransferItemList](https://html.spec.whatwg.org/multipage/#datatransferitemlist)` object, with the drag data.

`dataTransfer.[setDragImage](https://html.spec.whatwg.org/multipage/#dom-datatransfer-setdragimage)(element, x, y)`

[DataTransfer/setDragImage](https://developer.mozilla.org/en-US/docs/Web/API/DataTransfer/setDragImage "When a drag occurs, a translucent image is generated from the drag target (the element the dragstart event is fired at), and follows the mouse pointer during the drag. This image is created automatically, so you do not need to create it yourself. However, if a custom image is desired, the DataTransfer.setDragImage() method can be used to set the custom image to be used. The image will typically be an <img> element but it can also be a <canvas> or any other visible element.")

Support in all current engines.

Firefox3.5+Safari4+Chrome3+

---

Opera12.1+Edge79+

---

Edge (Legacy)18Internet ExplorerNo

---

Firefox Android?Safari iOS?Chrome Android?WebView Android37+Samsung Internet?Opera Android12.1+

Uses the given element to update the drag feedback, replacing any previously specified feedback.

`dataTransfer.[types](https://html.spec.whatwg.org/multipage/#dom-datatransfer-types)`

[DataTransfer/types](https://developer.mozilla.org/en-US/docs/Web/API/DataTransfer/types "The DataTransfer.types read-only property returns the available types that exist in the items.")

Support in all current engines.

Firefox3.5+Safari4+Chrome3+

---

Opera12.1+Edge79+

---

Edge (Legacy)12+Internet Explorer10+

---

Firefox Android?Safari iOS?Chrome Android?WebView Android37+Samsung Internet?Opera Android12.1+

Returns a [frozen array](https://webidl.spec.whatwg.org/#dfn-frozen-array-type) listing the formats that were set in the `[dragstart](https://html.spec.whatwg.org/multipage/#event-dnd-dragstart)` event. In addition, if any files are being dragged, then one of the types will be the string "`Files`".

`data = dataTransfer.[getData](https://html.spec.whatwg.org/multipage/#dom-datatransfer-getdata)(format)`

[DataTransfer/getData](https://developer.mozilla.org/en-US/docs/Web/API/DataTransfer/getData "The DataTransfer.getData() method retrieves drag data (as a string) for the specified type. If the drag operation does not include data, this method returns an empty string.")

Support in all current engines.

Firefox3.5+Safari4+Chrome3+

---

Opera12.1+Edge79+

---

Edge (Legacy)12+Internet Explorer8+

---

Firefox Android?Safari iOS?Chrome Android?WebView Android37+Samsung Internet?Opera Android12.1+

Returns the specified data. If there is no such data, returns the empty string.

`dataTransfer.[setData](https://html.spec.whatwg.org/multipage/#dom-datatransfer-setdata)(format, data)`

[DataTransfer/setData](https://developer.mozilla.org/en-US/docs/Web/API/DataTransfer/setData "The DataTransfer.setData() method sets the drag operation's drag data to the specified data and type. If data for the given type does not exist, it is added at the end of the drag data store, such that the last item in the types list will be the new type. If data for the given type already exists, the existing data is replaced in the same position. That is, the order of the types list is not changed when replacing data of the same type.")

Support in all current engines.

Firefox3.5+Safari5+Chrome3+

---

Opera12+Edge79+

---

Edge (Legacy)12+Internet Explorer8+

---

Firefox Android?Safari iOS5+Chrome Android?WebView Android37+Samsung Internet?Opera Android12+

Adds the specified data.

`dataTransfer.[clearData](https://html.spec.whatwg.org/multipage/#dom-datatransfer-cleardata)([ format ])`

[DataTransfer/clearData](https://developer.mozilla.org/en-US/docs/Web/API/DataTransfer/clearData "The DataTransfer.clearData() method removes the drag operation's drag data for the given type. If data for the given type does not exist, this method does nothing.")

Support in all current engines.

Firefox3.5+Safari4+Chrome3+

---

Opera12.1+Edge79+

---

Edge (Legacy)12+Internet Explorer8+

---

Firefox Android?Safari iOS?Chrome Android?WebView Android37+Samsung Internet?Opera Android12.1+

Removes the data of the specified formats. Removes all data if the argument is omitted.

`dataTransfer.[files](https://html.spec.whatwg.org/multipage/#dom-datatransfer-files)`

[DataTransfer/files](https://developer.mozilla.org/en-US/docs/Web/API/DataTransfer/files "The files property of DataTransfer objects is a list of the files in the drag operation. If the operation includes no files, the list is empty.")

Support in all current engines.

Firefox3.6+Safari4+Chrome3+

---

Opera12.1+Edge79+

---

Edge (Legacy)12+Internet Explorer10+

---

Firefox Android?Safari iOS?Chrome Android?WebView Android37+Samsung Internet?Opera Android12.1+

Returns a `[FileList](https://w3c.github.io/FileAPI/#filelist-section)` of the files being dragged, if any.

`[DataTransfer](https://html.spec.whatwg.org/multipage/#datatransfer)` objects that are created as part of [drag-and-drop events](https://html.spec.whatwg.org/multipage/#dndevents) are only valid while those events are being fired.

A `[DataTransfer](https://html.spec.whatwg.org/multipage/#datatransfer)` object is associated with a [drag data store](https://html.spec.whatwg.org/multipage/#drag-data-store) while it is valid.

A `[DataTransfer](https://html.spec.whatwg.org/multipage/#datatransfer)` object has an associated types array, which is a `[FrozenArray<DOMString>](https://webidl.spec.whatwg.org/#dfn-frozen-array-type)`, initially empty. When the contents of the `[DataTransfer](https://html.spec.whatwg.org/multipage/#datatransfer)` object's [drag data store item list](https://html.spec.whatwg.org/multipage/#drag-data-store-item-list) change, or when the `[DataTransfer](https://html.spec.whatwg.org/multipage/#datatransfer)` object becomes no longer associated with a [drag data store](https://html.spec.whatwg.org/multipage/#drag-data-store), run the following steps:

1. Let L be an empty sequence.
2. If the `[DataTransfer](https://html.spec.whatwg.org/multipage/#datatransfer)` object is still associated with a [drag data store](https://html.spec.whatwg.org/multipage/#drag-data-store), then:

1. For each item in the `[DataTransfer](https://html.spec.whatwg.org/multipage/#datatransfer)` object's [drag data store item list](https://html.spec.whatwg.org/multipage/#drag-data-store-item-list) whose [kind](https://html.spec.whatwg.org/multipage/#the-drag-data-item-kind) is *text*, add an entry to L consisting of the item's [type string](https://html.spec.whatwg.org/multipage/#the-drag-data-item-type-string).
2. If there are any items in the `[DataTransfer](https://html.spec.whatwg.org/multipage/#datatransfer)` object's [drag data store item list](https://html.spec.whatwg.org/multipage/#drag-data-store-item-list) whose [kind](https://html.spec.whatwg.org/multipage/#the-drag-data-item-kind) is *File*, then add an entry to L consisting of the string "`Files`". (This value can be distinguished from the other values because it is not lowercase.)
3. Set the `[DataTransfer](https://html.spec.whatwg.org/multipage/#datatransfer)` object's [types array](https://html.spec.whatwg.org/multipage/#concept-datatransfer-types) to the result of [creating a frozen array](https://webidl.spec.whatwg.org/#dfn-create-frozen-array) from L.

The `DataTransfer()` constructor, when invoked, must return a newly created `[DataTransfer](https://html.spec.whatwg.org/multipage/#datatransfer)` object initialized as follows:

1. Set the [drag data store](https://html.spec.whatwg.org/multipage/#drag-data-store)'s [item list](https://html.spec.whatwg.org/multipage/#drag-data-store-item-list) to be an empty list.
2. Set the [drag data store](https://html.spec.whatwg.org/multipage/#drag-data-store)'s [mode](https://html.spec.whatwg.org/multipage/#drag-data-store-mode) to [read/write mode](https://html.spec.whatwg.org/multipage/#concept-dnd-rw).
3. Set the `[dropEffect](https://html.spec.whatwg.org/multipage/#dom-datatransfer-dropeffect)` and `[effectAllowed](https://html.spec.whatwg.org/multipage/#dom-datatransfer-effectallowed)` to "none".

The `dropEffect` attribute controls the drag-and-drop feedback that the user is given during a drag-and-drop operation. When the `[DataTransfer](https://html.spec.whatwg.org/multipage/#datatransfer)` object is created, the `[dropEffect](https://html.spec.whatwg.org/multipage/#dom-datatransfer-dropeffect)` attribute is set to a string value. On getting, it must return its current value. On setting, if the new value is one of "`none`", "`copy`", "`link`", or "`move`", then the attribute's current value must be set to the new value. Other values must be ignored.

The `effectAllowed` attribute is used in the drag-and-drop processing model to initialize the `[dropEffect](https://html.spec.whatwg.org/multipage/#dom-datatransfer-dropeffect)` attribute during the `[dragenter](https://html.spec.whatwg.org/multipage/#event-dnd-dragenter)` and `[dragover](https://html.spec.whatwg.org/multipage/#event-dnd-dragover)` events. When the `[DataTransfer](https://html.spec.whatwg.org/multipage/#datatransfer)` object is created, the `[effectAllowed](https://html.spec.whatwg.org/multipage/#dom-datatransfer-effectallowed)` attribute is set to a string value. On getting, it must return its current value. On setting, if [drag data store](https://html.spec.whatwg.org/multipage/#drag-data-store)'s [mode](https://html.spec.whatwg.org/multipage/#drag-data-store-mode) is the [read/write mode](https://html.spec.whatwg.org/multipage/#concept-dnd-rw) and the new value is one of "`none`", "`copy`", "`copyLink`", "`copyMove`", "`link`", "`linkMove`", "`move`", "`all`", or "`uninitialized`", then the attribute's current value must be set to the new value. Otherwise, it must be left unchanged.

The `items` attribute must return a `[DataTransferItemList](https://html.spec.whatwg.org/multipage/#datatransferitemlist)` object associated with the `[DataTransfer](https://html.spec.whatwg.org/multipage/#datatransfer)` object.

The `setDragImage(image, x,   y)` method must run the following steps:

1. If the `[DataTransfer](https://html.spec.whatwg.org/multipage/#datatransfer)` object is no longer associated with a [drag data store](https://html.spec.whatwg.org/multipage/#drag-data-store), return. Nothing happens.
2. If the [drag data store](https://html.spec.whatwg.org/multipage/#drag-data-store)'s [mode](https://html.spec.whatwg.org/multipage/#drag-data-store-mode) is not the [read/write mode](https://html.spec.whatwg.org/multipage/#concept-dnd-rw), return. Nothing happens.
3. If image is an `[img](https://html.spec.whatwg.org/multipage/embedded-content.html#the-img-element)` element, then set the [drag data store bitmap](https://html.spec.whatwg.org/multipage/#drag-data-store-bitmap) to the element's image (at its [natural size](https://drafts.csswg.org/css-images/#natural-dimensions)); otherwise, set the [drag data store bitmap](https://html.spec.whatwg.org/multipage/#drag-data-store-bitmap) to an image generated from the given element (the exact mechanism for doing so is not currently specified).
4. Set the [drag data store hot spot coordinate](https://html.spec.whatwg.org/multipage/#drag-data-store-hot-spot-coordinate) to the given x, y coordinate.

The `types` attribute must return this `[DataTransfer](https://html.spec.whatwg.org/multipage/#datatransfer)` object's [types array](https://html.spec.whatwg.org/multipage/#concept-datatransfer-types).

The `getData(format)` method must run the following steps:

1. If the `[DataTransfer](https://html.spec.whatwg.org/multipage/#datatransfer)` object is no longer associated with a [drag data store](https://html.spec.whatwg.org/multipage/#drag-data-store), then return the empty string.
2. If the [drag data store](https://html.spec.whatwg.org/multipage/#drag-data-store)'s [mode](https://html.spec.whatwg.org/multipage/#drag-data-store-mode) is the [protected mode](https://html.spec.whatwg.org/multipage/#concept-dnd-p), then return the empty string.
3. Let format be the first argument, [converted to ASCII lowercase](https://infra.spec.whatwg.org/#ascii-lowercase).
4. Let convert-to-URL be false.
5. If format equals "`text`", change it to "`text/plain`".
6. If format equals "`url`", change it to "`text/uri-list`" and set convert-to-URL to true.
7. If there is no item in the [drag data store item list](https://html.spec.whatwg.org/multipage/#drag-data-store-item-list) whose [kind](https://html.spec.whatwg.org/multipage/#the-drag-data-item-kind) is *text* and whose [type string](https://html.spec.whatwg.org/multipage/#the-drag-data-item-type-string) is equal to format, return the empty string.
8. Let result be the data of the item in the [drag data store item list](https://html.spec.whatwg.org/multipage/#drag-data-store-item-list) whose [kind](https://html.spec.whatwg.org/multipage/#the-drag-data-item-kind) is *Plain Unicode string* and whose [type string](https://html.spec.whatwg.org/multipage/#the-drag-data-item-type-string) is equal to format.
9. If convert-to-URL is true, then parse result as appropriate for `text/uri-list` data, and then set result to the first URL from the list, if any, or the empty string otherwise. [\[RFC2483\]](https://html.spec.whatwg.org/multipage/references.html#refsRFC2483)
10. Return result.

The `setData(format, data)` method must run the following steps:

1. If the `[DataTransfer](https://html.spec.whatwg.org/multipage/#datatransfer)` object is no longer associated with a [drag data store](https://html.spec.whatwg.org/multipage/#drag-data-store), return. Nothing happens.
2. If the [drag data store](https://html.spec.whatwg.org/multipage/#drag-data-store)'s [mode](https://html.spec.whatwg.org/multipage/#drag-data-store-mode) is not the [read/write mode](https://html.spec.whatwg.org/multipage/#concept-dnd-rw), return. Nothing happens.
3. Let format be the first argument, [converted to ASCII lowercase](https://infra.spec.whatwg.org/#ascii-lowercase).
4. If format equals "`text`", change it to "`text/plain`".

If format equals "`url`", change it to "`text/uri-list`".
5. Remove the item in the [drag data store item list](https://html.spec.whatwg.org/multipage/#drag-data-store-item-list) whose [kind](https://html.spec.whatwg.org/multipage/#the-drag-data-item-kind) is *text* and whose [type string](https://html.spec.whatwg.org/multipage/#the-drag-data-item-type-string) is equal to format, if there is one.
6. Add an item to the [drag data store item list](https://html.spec.whatwg.org/multipage/#drag-data-store-item-list) whose [kind](https://html.spec.whatwg.org/multipage/#the-drag-data-item-kind) is *text*, whose [type string](https://html.spec.whatwg.org/multipage/#the-drag-data-item-type-string) is equal to format, and whose data is the string given by the method's second argument.

The `clearData(format)` method must run the following steps:

1. If the `[DataTransfer](https://html.spec.whatwg.org/multipage/#datatransfer)` object is no longer associated with a [drag data store](https://html.spec.whatwg.org/multipage/#drag-data-store), return. Nothing happens.
2. If the [drag data store](https://html.spec.whatwg.org/multipage/#drag-data-store)'s [mode](https://html.spec.whatwg.org/multipage/#drag-data-store-mode) is not the [read/write mode](https://html.spec.whatwg.org/multipage/#concept-dnd-rw), return. Nothing happens.
3. If the method was called with no arguments, remove each item in the [drag data store item list](https://html.spec.whatwg.org/multipage/#drag-data-store-item-list) whose [kind](https://html.spec.whatwg.org/multipage/#the-drag-data-item-kind) is *Plain Unicode string*, and return.
4. Set format to format, [converted to ASCII lowercase](https://infra.spec.whatwg.org/#ascii-lowercase).
5. If format equals "`text`", change it to "`text/plain`".

If format equals "`url`", change it to "`text/uri-list`".
6. Remove the item in the [drag data store item list](https://html.spec.whatwg.org/multipage/#drag-data-store-item-list) whose [kind](https://html.spec.whatwg.org/multipage/#the-drag-data-item-kind) is *text* and whose [type string](https://html.spec.whatwg.org/multipage/#the-drag-data-item-type-string) is equal to format, if there is one.

The `[clearData()](https://html.spec.whatwg.org/multipage/#dom-datatransfer-cleardata)` method does not affect whether any files were included in the drag, so the `[types](https://html.spec.whatwg.org/multipage/#dom-datatransfer-types)` attribute's list might still not be empty after calling `[clearData()](https://html.spec.whatwg.org/multipage/#dom-datatransfer-cleardata)` (it would still contain the "`Files`" string if any files were included in the drag).

The `files` attribute must return a [live](https://html.spec.whatwg.org/multipage/infrastructure.html#live) `[FileList](https://w3c.github.io/FileAPI/#filelist-section)` sequence consisting of `[File](https://w3c.github.io/FileAPI/#dfn-file)` objects representing the files found by the following steps. Furthermore, for a given `[FileList](https://w3c.github.io/FileAPI/#filelist-section)` object and a given underlying file, the same `[File](https://w3c.github.io/FileAPI/#dfn-file)` object must be used each time.

1. Start with an empty list L.
2. If the `[DataTransfer](https://html.spec.whatwg.org/multipage/#datatransfer)` object is no longer associated with a [drag data store](https://html.spec.whatwg.org/multipage/#drag-data-store), the `[FileList](https://w3c.github.io/FileAPI/#filelist-section)` is empty. Return the empty list L.
3. If the [drag data store](https://html.spec.whatwg.org/multipage/#drag-data-store)'s [mode](https://html.spec.whatwg.org/multipage/#drag-data-store-mode) is the [protected mode](https://html.spec.whatwg.org/multipage/#concept-dnd-p), return the empty list L.
4. For each item in the [drag data store item list](https://html.spec.whatwg.org/multipage/#drag-data-store-item-list) whose [kind](https://html.spec.whatwg.org/multipage/#the-drag-data-item-kind) is *File*, add the item's data (the file, in particular its name and contents, as well as its [type](https://html.spec.whatwg.org/multipage/#the-drag-data-item-type-string)) to the list L.
5. The files found by these steps are those in the list L.

This version of the API does not expose the types of the files during the drag.

##### 6.11.3.1 The `[DataTransferItemList](https://html.spec.whatwg.org/multipage/#datatransferitemlist)` interface[DataTransferItemList](https://developer.mozilla.org/en-US/docs/Web/API/DataTransferItemList "The DataTransferItemList object is a list of DataTransferItem objects representing items being dragged. During a drag operation, each DragEvent has a dataTransfer property and that property is a DataTransferItemList.")

Support in all current engines.

Firefox50+Safari6+Chrome13+

---

Opera12+Edge79+

---

Edge (Legacy)12+Internet ExplorerNo

---

Firefox Android?Safari iOS?Chrome Android?WebView Android?Samsung Internet?Opera Android14+

Each `[DataTransfer](https://html.spec.whatwg.org/multipage/#datatransfer)` object is associated with a `[DataTransferItemList](https://html.spec.whatwg.org/multipage/#datatransferitemlist)` object.

```
[Exposed=Window]
interface DataTransferItemList {
  readonly attribute unsigned long length;
  getter DataTransferItem (unsigned long index);
  DataTransferItem? add(DOMString data, DOMString type);
  DataTransferItem? add(File data);
  undefined remove(unsigned long index);
  undefined clear();
};
```

`items.[length](https://html.spec.whatwg.org/multipage/#dom-datatransferitemlist-length)`

[DataTransferItemList/length](https://developer.mozilla.org/en-US/docs/Web/API/DataTransferItemList/length "The read-only length property of the DataTransferItemList interface returns the number of items currently in the drag item list.")

Support in all current engines.

Firefox50+Safari6+Chrome13+

---

Opera12+Edge79+

---

Edge (Legacy)12+Internet ExplorerNo

---

Firefox Android?Safari iOS?Chrome Android?WebView Android?Samsung Internet?Opera Android14+

Returns the number of items in the [drag data store](https://html.spec.whatwg.org/multipage/#drag-data-store).

`items[index]`

Returns the `[DataTransferItem](https://html.spec.whatwg.org/multipage/#datatransferitem)` object representing the indexth entry in the [drag data store](https://html.spec.whatwg.org/multipage/#drag-data-store).

`items.[remove](https://html.spec.whatwg.org/multipage/#dom-datatransferitemlist-remove)(index)`

[DataTransferItemList/remove](https://developer.mozilla.org/en-US/docs/Web/API/DataTransferItemList/remove "The DataTransferItemList.remove() method removes the DataTransferItem at the specified index from the list. If the index is less than zero or greater than one less than the length of the list, the list will not be changed.")

Support in all current engines.

Firefox50+Safari6+Chrome31+

---

Opera12+Edge79+

---

Edge (Legacy)12+Internet ExplorerNo

---

Firefox Android?Safari iOS?Chrome Android?WebView Android?Samsung Internet?Opera Android14+

Removes the indexth entry in the [drag data store](https://html.spec.whatwg.org/multipage/#drag-data-store).

`items.[clear](https://html.spec.whatwg.org/multipage/#dom-datatransferitemlist-clear)()`

[DataTransferItemList/clear](https://developer.mozilla.org/en-US/docs/Web/API/DataTransferItemList/clear "The DataTransferItemList method clear() removes all DataTransferItem objects from the drag data items list, leaving the list empty.")

Support in all current engines.

Firefox50+Safari6+Chrome13+

---

Opera12+Edge79+

---

Edge (Legacy)12+Internet ExplorerNo

---

Firefox Android?Safari iOS?Chrome Android?WebView Android?Samsung Internet?Opera Android14+

Removes all the entries in the [drag data store](https://html.spec.whatwg.org/multipage/#drag-data-store).

`items.[add](https://html.spec.whatwg.org/multipage/#dom-datatransferitemlist-add)(data)`

[DataTransferItemList/add](https://developer.mozilla.org/en-US/docs/Web/API/DataTransferItemList/add "The DataTransferItemList.add() method creates a new DataTransferItem using the specified data and adds it to the drag data list. The item may be a File or a string of a given type. If the item is successfully added to the list, the newly-created DataTransferItem object is returned.")

Support in all current engines.

Firefox50+Safari6+Chrome13+

---

Opera12+Edge79+

---

Edge (Legacy)12+Internet ExplorerNo

---

Firefox Android?Safari iOS?Chrome Android?WebView Android?Samsung Internet?Opera Android14+

`items.[add](https://html.spec.whatwg.org/multipage/#dom-datatransferitemlist-add)(data, type)`

Adds a new entry for the given data to the [drag data store](https://html.spec.whatwg.org/multipage/#drag-data-store). If the data is plain text then a type string has to be provided also.

While the `[DataTransferItemList](https://html.spec.whatwg.org/multipage/#datatransferitemlist)` object's `[DataTransfer](https://html.spec.whatwg.org/multipage/#datatransfer)` object is associated with a [drag data store](https://html.spec.whatwg.org/multipage/#drag-data-store), the `[DataTransferItemList](https://html.spec.whatwg.org/multipage/#datatransferitemlist)` object's *mode* is the same as the [drag data store mode](https://html.spec.whatwg.org/multipage/#drag-data-store-mode). When the `[DataTransferItemList](https://html.spec.whatwg.org/multipage/#datatransferitemlist)` object's `[DataTransfer](https://html.spec.whatwg.org/multipage/#datatransfer)` object is *not* associated with a [drag data store](https://html.spec.whatwg.org/multipage/#drag-data-store), the `[DataTransferItemList](https://html.spec.whatwg.org/multipage/#datatransferitemlist)` object's *mode* is the *disabled mode*. The [drag data store](https://html.spec.whatwg.org/multipage/#drag-data-store) referenced in this section (which is used only when the `[DataTransferItemList](https://html.spec.whatwg.org/multipage/#datatransferitemlist)` object is not in the *disabled mode*) is the [drag data store](https://html.spec.whatwg.org/multipage/#drag-data-store) with which the `[DataTransferItemList](https://html.spec.whatwg.org/multipage/#datatransferitemlist)` object's `[DataTransfer](https://html.spec.whatwg.org/multipage/#datatransfer)` object is associated.

The `length` attribute must return zero if the object is in the *disabled mode*; otherwise it must return the number of items in the [drag data store item list](https://html.spec.whatwg.org/multipage/#drag-data-store-item-list).

When a `[DataTransferItemList](https://html.spec.whatwg.org/multipage/#datatransferitemlist)` object is not in the *disabled mode*, its [supported property indices](https://webidl.spec.whatwg.org/#dfn-supported-property-indices) are the [indices](https://infra.spec.whatwg.org/#list-get-the-indices) of the [drag data store item list](https://html.spec.whatwg.org/multipage/#drag-data-store-item-list).

To [determine the value of an indexed property](https://webidl.spec.whatwg.org/#dfn-determine-the-value-of-an-indexed-property) i of a `[DataTransferItemList](https://html.spec.whatwg.org/multipage/#datatransferitemlist)` object, the user agent must return a `[DataTransferItem](https://html.spec.whatwg.org/multipage/#datatransferitem)` object representing the ith item in the [drag data store](https://html.spec.whatwg.org/multipage/#drag-data-store). The same object must be returned each time a particular item is obtained from this `[DataTransferItemList](https://html.spec.whatwg.org/multipage/#datatransferitemlist)` object. The `[DataTransferItem](https://html.spec.whatwg.org/multipage/#datatransferitem)` object must be associated with the same `[DataTransfer](https://html.spec.whatwg.org/multipage/#datatransfer)` object as the `[DataTransferItemList](https://html.spec.whatwg.org/multipage/#datatransferitemlist)` object when it is first created.

The `add()` method must run the following steps:

1. If the `[DataTransferItemList](https://html.spec.whatwg.org/multipage/#datatransferitemlist)` object is not in the *[read/write mode](https://html.spec.whatwg.org/multipage/#concept-dnd-rw)*, return null.
2. Jump to the appropriate set of steps from the following list:

If the first argument to the method is a string

If there is already an item in the [drag data store item list](https://html.spec.whatwg.org/multipage/#drag-data-store-item-list) whose [kind](https://html.spec.whatwg.org/multipage/#the-drag-data-item-kind) is *text* and whose [type string](https://html.spec.whatwg.org/multipage/#the-drag-data-item-type-string) is equal to the value of the method's second argument, [converted to ASCII lowercase](https://infra.spec.whatwg.org/#ascii-lowercase), then throw a ["`NotSupportedError`"](https://webidl.spec.whatwg.org/#notsupportederror) `[DOMException](https://webidl.spec.whatwg.org/#dfn-DOMException)`.

Otherwise, add an item to the [drag data store item list](https://html.spec.whatwg.org/multipage/#drag-data-store-item-list) whose [kind](https://html.spec.whatwg.org/multipage/#the-drag-data-item-kind) is *text*, whose [type string](https://html.spec.whatwg.org/multipage/#the-drag-data-item-type-string) is equal to the value of the method's second argument, [converted to ASCII lowercase](https://infra.spec.whatwg.org/#ascii-lowercase), and whose data is the string given by the method's first argument.

If the first argument to the method is a `[File](https://w3c.github.io/FileAPI/#dfn-file)`

Add an item to the [drag data store item list](https://html.spec.whatwg.org/multipage/#drag-data-store-item-list) whose [kind](https://html.spec.whatwg.org/multipage/#the-drag-data-item-kind) is *File*, whose [type string](https://html.spec.whatwg.org/multipage/#the-drag-data-item-type-string) is the `[type](https://w3c.github.io/FileAPI/#dfn-type)` of the `[File](https://w3c.github.io/FileAPI/#dfn-file)`, [converted to ASCII lowercase](https://infra.spec.whatwg.org/#ascii-lowercase), and whose data is the same as the `[File](https://w3c.github.io/FileAPI/#dfn-file)`'s data.
3. [Determine the value of the indexed property](https://html.spec.whatwg.org/multipage/#dom-datatransferitemlist-item) corresponding to the newly added item, and return that value (a newly created `[DataTransferItem](https://html.spec.whatwg.org/multipage/#datatransferitem)` object).

The `remove(index)` method must run these steps:

1. If the `[DataTransferItemList](https://html.spec.whatwg.org/multipage/#datatransferitemlist)` object is not in the *[read/write mode](https://html.spec.whatwg.org/multipage/#concept-dnd-rw)*, throw an ["`InvalidStateError`"](https://webidl.spec.whatwg.org/#invalidstateerror) `[DOMException](https://webidl.spec.whatwg.org/#dfn-DOMException)`.
2. If the [drag data store](https://html.spec.whatwg.org/multipage/#drag-data-store) does not contain an indexth item, then return.
3. Remove the indexth item from the [drag data store](https://html.spec.whatwg.org/multipage/#drag-data-store).

The `clear()` method, if the `[DataTransferItemList](https://html.spec.whatwg.org/multipage/#datatransferitemlist)` object is in the *[read/write mode](https://html.spec.whatwg.org/multipage/#concept-dnd-rw)*, must remove all the items from the [drag data store](https://html.spec.whatwg.org/multipage/#drag-data-store). Otherwise, it must do nothing.

##### 6.11.3.2 The `[DataTransferItem](https://html.spec.whatwg.org/multipage/#datatransferitem)` interface[DataTransferItem](https://developer.mozilla.org/en-US/docs/Web/API/DataTransferItem "The DataTransferItem object represents one drag data item. During a drag operation, each drag event has a dataTransfer property which contains a list of drag data items. Each item in the list is a DataTransferItem object.")

Support in all current engines.

Firefox50+Safari5.1+Chrome11+

---

Opera12+Edge79+

---

Edge (Legacy)12+Internet ExplorerNo

---

Firefox Android?Safari iOS?Chrome Android?WebView Android4+Samsung Internet?Opera Android14+

Each `[DataTransferItem](https://html.spec.whatwg.org/multipage/#datatransferitem)` object is associated with a `[DataTransfer](https://html.spec.whatwg.org/multipage/#datatransfer)` object.

```
[Exposed=Window]
interface DataTransferItem {
  readonly attribute DOMString kind;
  readonly attribute DOMString type;
  undefined getAsString(FunctionStringCallback? _callback);
  File? getAsFile();
};

callback FunctionStringCallback = undefined (DOMString data);
```

`item.[kind](https://html.spec.whatwg.org/multipage/#dom-datatransferitem-kind)`

[DataTransferItem/kind](https://developer.mozilla.org/en-US/docs/Web/API/DataTransferItem/kind "The read-only DataTransferItem.kind property returns a DataTransferItem representing the drag data item kind: some text or some file.")

Support in all current engines.

Firefox50+Safari5.1+Chrome11+

---

Opera12+Edge79+

---

Edge (Legacy)12+Internet ExplorerNo

---

Firefox Android?Safari iOS?Chrome Android?WebView Android4+Samsung Internet?Opera Android14+

Returns [the drag data item kind](https://html.spec.whatwg.org/multipage/#the-drag-data-item-kind), one of: "string", "file".

`item.[type](https://html.spec.whatwg.org/multipage/#dom-datatransferitem-type)`

[DataTransferItem/type](https://developer.mozilla.org/en-US/docs/Web/API/DataTransferItem/type "The read-only DataTransferItem.type property returns the type (format) of the DataTransferItem object representing the drag data item. The type is a Unicode string generally given by a MIME type, although a MIME type is not required.")

Support in all current engines.

Firefox50+Safari5.1+Chrome11+

---

Opera12+Edge79+

---

Edge (Legacy)12+Internet ExplorerNo

---

Firefox Android?Safari iOS?Chrome Android?WebView Android4+Samsung Internet?Opera Android14+

Returns [the drag data item type string](https://html.spec.whatwg.org/multipage/#the-drag-data-item-type-string).

`item.[getAsString](https://html.spec.whatwg.org/multipage/#dom-datatransferitem-getasstring)(callback)`

[DataTransferItem/getAsString](https://developer.mozilla.org/en-US/docs/Web/API/DataTransferItem/getAsString "The DataTransferItem.getAsString() method invokes the given callback with the drag data item's string data as the argument if the item's kind is a Plain unicode string (i.e. kind is string).")

Support in all current engines.

Firefox50+Safari5.1+Chrome11+

---

Opera12+Edge79+

---

Edge (Legacy)12+Internet ExplorerNo

---

Firefox Android?Safari iOS?Chrome Android?WebView Android4+Samsung Internet?Opera Android14+

Invokes the callback with the string data as the argument, if [the drag data item kind](https://html.spec.whatwg.org/multipage/#the-drag-data-item-kind) is *text*.

`file = item.[getAsFile](https://html.spec.whatwg.org/multipage/#dom-datatransferitem-getasfile)()`

[DataTransferItem/getAsFile](https://developer.mozilla.org/en-US/docs/Web/API/DataTransferItem/getAsFile "If the item is a file, the DataTransferItem.getAsFile() method returns the drag data item's File object. If the item is not a file, this method returns null.")

Support in all current engines.

Firefox50+Safari5.1+Chrome11+

---

Opera12+Edge79+

---

Edge (Legacy)12+Internet ExplorerNo

---

Firefox Android?Safari iOS?Chrome Android?WebView Android4+Samsung Internet?Opera Android14+

Returns a `[File](https://w3c.github.io/FileAPI/#dfn-file)` object, if [the drag data item kind](https://html.spec.whatwg.org/multipage/#the-drag-data-item-kind) is *File*.

While the `[DataTransferItem](https://html.spec.whatwg.org/multipage/#datatransferitem)` object's `[DataTransfer](https://html.spec.whatwg.org/multipage/#datatransfer)` object is associated with a [drag data store](https://html.spec.whatwg.org/multipage/#drag-data-store) and that [drag data store](https://html.spec.whatwg.org/multipage/#drag-data-store)'s [drag data store item list](https://html.spec.whatwg.org/multipage/#drag-data-store-item-list) still contains the item that the `[DataTransferItem](https://html.spec.whatwg.org/multipage/#datatransferitem)` object represents, the `[DataTransferItem](https://html.spec.whatwg.org/multipage/#datatransferitem)` object's *mode* is the same as the [drag data store mode](https://html.spec.whatwg.org/multipage/#drag-data-store-mode). When the `[DataTransferItem](https://html.spec.whatwg.org/multipage/#datatransferitem)` object's `[DataTransfer](https://html.spec.whatwg.org/multipage/#datatransfer)` object is *not* associated with a [drag data store](https://html.spec.whatwg.org/multipage/#drag-data-store), or if the item that the `[DataTransferItem](https://html.spec.whatwg.org/multipage/#datatransferitem)` object represents has been removed from the relevant [drag data store item list](https://html.spec.whatwg.org/multipage/#drag-data-store-item-list), the `[DataTransferItem](https://html.spec.whatwg.org/multipage/#datatransferitem)` object's *mode* is the *disabled mode*. The [drag data store](https://html.spec.whatwg.org/multipage/#drag-data-store) referenced in this section (which is used only when the `[DataTransferItem](https://html.spec.whatwg.org/multipage/#datatransferitem)` object is not in the *disabled mode*) is the [drag data store](https://html.spec.whatwg.org/multipage/#drag-data-store) with which the `[DataTransferItem](https://html.spec.whatwg.org/multipage/#datatransferitem)` object's `[DataTransfer](https://html.spec.whatwg.org/multipage/#datatransfer)` object is associated.

The `kind` attribute must return the empty string if the `[DataTransferItem](https://html.spec.whatwg.org/multipage/#datatransferitem)` object is in the *disabled mode*; otherwise it must return the string given in the cell from the second column of the following table from the row whose cell in the first column contains [the drag data item kind](https://html.spec.whatwg.org/multipage/#the-drag-data-item-kind) of the item represented by the `[DataTransferItem](https://html.spec.whatwg.org/multipage/#datatransferitem)` object:

| Kind | String |
| --- | --- |
| *Text* | "`string`" |
| *File* | "`file`" |

The `type` attribute must return the empty string if the `[DataTransferItem](https://html.spec.whatwg.org/multipage/#datatransferitem)` object is in the *disabled mode*; otherwise it must return [the drag data item type string](https://html.spec.whatwg.org/multipage/#the-drag-data-item-type-string) of the item represented by the `[DataTransferItem](https://html.spec.whatwg.org/multipage/#datatransferitem)` object.

The `getAsString(callback)` method must run the following steps:

1. If the callback is null, return.
2. If the `[DataTransferItem](https://html.spec.whatwg.org/multipage/#datatransferitem)` object is not in the *[read/write mode](https://html.spec.whatwg.org/multipage/#concept-dnd-rw)* or the *[read-only mode](https://html.spec.whatwg.org/multipage/#concept-dnd-ro)*, return. The callback is never invoked.
3. If [the drag data item kind](https://html.spec.whatwg.org/multipage/#the-drag-data-item-kind) is not *text*, then return. The callback is never invoked.
4. Otherwise, [queue a task](https://html.spec.whatwg.org/multipage/webappapis.html#queue-a-task) to invoke callback, passing the actual data of the item represented by the `[DataTransferItem](https://html.spec.whatwg.org/multipage/#datatransferitem)` object as the argument.

The `getAsFile()` method must run the following steps:

1. If the `[DataTransferItem](https://html.spec.whatwg.org/multipage/#datatransferitem)` object is not in the *[read/write mode](https://html.spec.whatwg.org/multipage/#concept-dnd-rw)* or the *[read-only mode](https://html.spec.whatwg.org/multipage/#concept-dnd-ro)*, then return null.
2. If [the drag data item kind](https://html.spec.whatwg.org/multipage/#the-drag-data-item-kind) is not *File*, then return null.
3. Return a new `[File](https://w3c.github.io/FileAPI/#dfn-file)` object representing the actual data of the item represented by the `[DataTransferItem](https://html.spec.whatwg.org/multipage/#datatransferitem)` object.

#### 6.11.4 The `[DragEvent](https://html.spec.whatwg.org/multipage/#dragevent)` interface[DragEvent/DragEvent](https://developer.mozilla.org/en-US/docs/Web/API/DragEvent/DragEvent "This constructor is used to create a synthetic DragEvent object.")

Support in all current engines.

Firefox3.5+Safari14+Chrome46+

---

Opera12+Edge79+

---

Edge (Legacy)12+Internet ExplorerNo

---

Firefox Android?Safari iOSNoChrome AndroidNoWebView Android?Samsung Internet?Opera Android?

[DragEvent](https://developer.mozilla.org/en-US/docs/Web/API/DragEvent "The DragEvent interface is a DOM event that represents a drag and drop interaction. The user initiates a drag by placing a pointer device (such as a mouse) on the touch surface and then dragging the pointer to a new location (such as another DOM element). Applications are free to interpret a drag and drop interaction in an application-specific way.")

Support in all current engines.

Firefox3.5+Safari14+Chrome46+

---

Opera12+Edge79+

---

Edge (Legacy)12+Internet Explorer9+

---

Firefox Android?Safari iOSNoChrome AndroidNoWebView Android?Samsung Internet?Opera Android?

The drag-and-drop processing model involves several events. They all use the `[DragEvent](https://html.spec.whatwg.org/multipage/#dragevent)` interface.

```
[Exposed=Window]
interface DragEvent : MouseEvent {
  constructor(DOMString type, optional DragEventInit eventInitDict = {});

  readonly attribute DataTransfer? dataTransfer;
};

dictionary DragEventInit : MouseEventInit {
  DataTransfer? dataTransfer = null;
};
```

`event.[dataTransfer](https://html.spec.whatwg.org/multipage/#dom-dragevent-datatransfer)`

[DragEvent/dataTransfer](https://developer.mozilla.org/en-US/docs/Web/API/DragEvent/dataTransfer "The DragEvent.dataTransfer property holds the drag operation's data (as a DataTransfer object).")

Support in all current engines.

Firefox3.5+Safari14+Chrome46+

---

Opera?Edge79+

---

Edge (Legacy)12+Internet Explorer🔰 10+

---

Firefox Android?Safari iOSNoChrome AndroidNoWebView Android?Samsung Internet?Opera Android?

Returns the `[DataTransfer](https://html.spec.whatwg.org/multipage/#datatransfer)` object for the event.

Although, for consistency with other event interfaces, the `[DragEvent](https://html.spec.whatwg.org/multipage/#dragevent)` interface has a constructor, it is not particularly useful. In particular, there's no way to create a useful `[DataTransfer](https://html.spec.whatwg.org/multipage/#datatransfer)` object from script, as `[DataTransfer](https://html.spec.whatwg.org/multipage/#datatransfer)` objects have a processing and security model that is coordinated by the browser during drag-and-drops.

The `dataTransfer` attribute of the `[DragEvent](https://html.spec.whatwg.org/multipage/#dragevent)` interface must return the value it was initialized to. It represents the context information for the event.

When a user agent is required to fire a DND event named e at an element, using a particular [drag data store](https://html.spec.whatwg.org/multipage/#drag-data-store), and optionally with a specific related target, the user agent must run the following steps:

1. Let dataDragStoreWasChanged be false.
2. If no specific related target was provided, set related target to null.
3. Let window be the [relevant global object](https://html.spec.whatwg.org/multipage/webappapis.html#concept-relevant-global) of the `[Document](https://html.spec.whatwg.org/multipage/dom.html#document)` object of the specified target element.
4. If e is `[dragstart](https://html.spec.whatwg.org/multipage/#event-dnd-dragstart)`, then set the [drag data store mode](https://html.spec.whatwg.org/multipage/#drag-data-store-mode) to the [read/write mode](https://html.spec.whatwg.org/multipage/#concept-dnd-rw) and set dataDragStoreWasChanged to true.

If e is `[drop](https://html.spec.whatwg.org/multipage/#event-dnd-drop)`, set the [drag data store mode](https://html.spec.whatwg.org/multipage/#drag-data-store-mode) to the [read-only mode](https://html.spec.whatwg.org/multipage/#concept-dnd-ro).
5. Let dataTransfer be a newly created `[DataTransfer](https://html.spec.whatwg.org/multipage/#datatransfer)` object associated with the given [drag data store](https://html.spec.whatwg.org/multipage/#drag-data-store).
6. Set the `[effectAllowed](https://html.spec.whatwg.org/multipage/#dom-datatransfer-effectallowed)` attribute to the [drag data store](https://html.spec.whatwg.org/multipage/#drag-data-store)'s [drag data store allowed effects state](https://html.spec.whatwg.org/multipage/#drag-data-store-allowed-effects-state).
7. Set the `[dropEffect](https://html.spec.whatwg.org/multipage/#dom-datatransfer-dropeffect)` attribute to "`[none](https://html.spec.whatwg.org/multipage/#dom-datatransfer-dropeffect-none)`" if e is `[dragstart](https://html.spec.whatwg.org/multipage/#event-dnd-dragstart)`, `[drag](https://html.spec.whatwg.org/multipage/#event-dnd-drag)`, or `[dragleave](https://html.spec.whatwg.org/multipage/#event-dnd-dragleave)`; to the value corresponding to the [current drag operation](https://html.spec.whatwg.org/multipage/#current-drag-operation) if e is `[drop](https://html.spec.whatwg.org/multipage/#event-dnd-drop)` or `[dragend](https://html.spec.whatwg.org/multipage/#event-dnd-dragend)`; and to a value based on the `[effectAllowed](https://html.spec.whatwg.org/multipage/#dom-datatransfer-effectallowed)` attribute's value and the drag-and-drop source, as given by the following table, otherwise (i.e. if e is `[dragenter](https://html.spec.whatwg.org/multipage/#event-dnd-dragenter)` or `[dragover](https://html.spec.whatwg.org/multipage/#event-dnd-dragover)`):

| `[effectAllowed](https://html.spec.whatwg.org/multipage/#dom-datatransfer-effectallowed)` | `[dropEffect](https://html.spec.whatwg.org/multipage/#dom-datatransfer-dropeffect)` |
| --- | --- |
| "`[none](https://html.spec.whatwg.org/multipage/#dom-datatransfer-effectallowed-none)`" | "`[none](https://html.spec.whatwg.org/multipage/#dom-datatransfer-dropeffect-none)`" |
| "`[copy](https://html.spec.whatwg.org/multipage/#dom-datatransfer-effectallowed-copy)`" | "`[copy](https://html.spec.whatwg.org/multipage/#dom-datatransfer-dropeffect-copy)`" |
| "`[copyLink](https://html.spec.whatwg.org/multipage/#dom-datatransfer-effectallowed-copylink)`" | "`[copy](https://html.spec.whatwg.org/multipage/#dom-datatransfer-dropeffect-copy)`", or, [if appropriate](https://html.spec.whatwg.org/multipage/#concept-platform-dropeffect-override), "`[link](https://html.spec.whatwg.org/multipage/#dom-datatransfer-dropeffect-link)`" |
| "`[copyMove](https://html.spec.whatwg.org/multipage/#dom-datatransfer-effectallowed-copymove)`" | "`[copy](https://html.spec.whatwg.org/multipage/#dom-datatransfer-dropeffect-copy)`", or, [if appropriate](https://html.spec.whatwg.org/multipage/#concept-platform-dropeffect-override), "`[move](https://html.spec.whatwg.org/multipage/#dom-datatransfer-dropeffect-move)`" |
| "`[all](https://html.spec.whatwg.org/multipage/#dom-datatransfer-effectallowed-all)`" | "`[copy](https://html.spec.whatwg.org/multipage/#dom-datatransfer-dropeffect-copy)`", or, [if appropriate](https://html.spec.whatwg.org/multipage/#concept-platform-dropeffect-override), either "`[link](https://html.spec.whatwg.org/multipage/#dom-datatransfer-dropeffect-link)`" or "`[move](https://html.spec.whatwg.org/multipage/#dom-datatransfer-dropeffect-move)`" |
| "`[link](https://html.spec.whatwg.org/multipage/#dom-datatransfer-effectallowed-link)`" | "`[link](https://html.spec.whatwg.org/multipage/#dom-datatransfer-dropeffect-link)`" |
| "`[linkMove](https://html.spec.whatwg.org/multipage/#dom-datatransfer-effectallowed-linkmove)`" | "`[link](https://html.spec.whatwg.org/multipage/#dom-datatransfer-dropeffect-link)`", or, [if appropriate](https://html.spec.whatwg.org/multipage/#concept-platform-dropeffect-override), "`[move](https://html.spec.whatwg.org/multipage/#dom-datatransfer-dropeffect-move)`" |
| "`[move](https://html.spec.whatwg.org/multipage/#dom-datatransfer-effectallowed-move)`" | "`[move](https://html.spec.whatwg.org/multipage/#dom-datatransfer-dropeffect-move)`" |
| "`[uninitialized](https://html.spec.whatwg.org/multipage/#dom-datatransfer-effectallowed-uninitialized)`" when what is being dragged is a selection from a text control | "`[move](https://html.spec.whatwg.org/multipage/#dom-datatransfer-dropeffect-move)`", or, [if appropriate](https://html.spec.whatwg.org/multipage/#concept-platform-dropeffect-override), either "`[copy](https://html.spec.whatwg.org/multipage/#dom-datatransfer-dropeffect-copy)`" or "`[link](https://html.spec.whatwg.org/multipage/#dom-datatransfer-dropeffect-link)`" |
| "`[uninitialized](https://html.spec.whatwg.org/multipage/#dom-datatransfer-effectallowed-uninitialized)`" when what is being dragged is a selection | "`[copy](https://html.spec.whatwg.org/multipage/#dom-datatransfer-dropeffect-copy)`", or, [if appropriate](https://html.spec.whatwg.org/multipage/#concept-platform-dropeffect-override), either "`[link](https://html.spec.whatwg.org/multipage/#dom-datatransfer-dropeffect-link)`" or "`[move](https://html.spec.whatwg.org/multipage/#dom-datatransfer-dropeffect-move)`" |
| "`[uninitialized](https://html.spec.whatwg.org/multipage/#dom-datatransfer-effectallowed-uninitialized)`" when what is being dragged is an `[a](https://html.spec.whatwg.org/multipage/text-level-semantics.html#the-a-element)` element with an `[href](https://html.spec.whatwg.org/multipage/links.html#attr-hyperlink-href)` attribute | "`[link](https://html.spec.whatwg.org/multipage/#dom-datatransfer-dropeffect-link)`", or, [if appropriate](https://html.spec.whatwg.org/multipage/#concept-platform-dropeffect-override), either "`[copy](https://html.spec.whatwg.org/multipage/#dom-datatransfer-dropeffect-copy)`" or "`[move](https://html.spec.whatwg.org/multipage/#dom-datatransfer-dropeffect-move)`" |
| Any other case | "`[copy](https://html.spec.whatwg.org/multipage/#dom-datatransfer-dropeffect-copy)`", or, [if appropriate](https://html.spec.whatwg.org/multipage/#concept-platform-dropeffect-override), either "`[link](https://html.spec.whatwg.org/multipage/#dom-datatransfer-dropeffect-link)`" or "`[move](https://html.spec.whatwg.org/multipage/#dom-datatransfer-dropeffect-move)`" |

Where the table above provides possibly appropriate alternatives, user agents may instead use the listed alternative values if platform conventions dictate that the user has requested those alternate effects.

For example, Windows platform conventions are such that dragging while holding the "alt" key indicates a preference for linking the data, rather than moving or copying it. Therefore, on a Windows system, if "`[link](https://html.spec.whatwg.org/multipage/#dom-datatransfer-dropeffect-link)`" is an option according to the table above while the "alt" key is depressed, the user agent could select that instead of "`[copy](https://html.spec.whatwg.org/multipage/#dom-datatransfer-dropeffect-copy)`" or "`[move](https://html.spec.whatwg.org/multipage/#dom-datatransfer-dropeffect-move)`".
8. Let event be the result of [creating an event](https://dom.spec.whatwg.org/#concept-event-create) using `[DragEvent](https://html.spec.whatwg.org/multipage/#dragevent)`.
9. Initialize event's `[type](https://dom.spec.whatwg.org/#dom-event-type)` attribute to e, its `[bubbles](https://dom.spec.whatwg.org/#dom-event-bubbles)` attribute to true, its `[view](https://w3c.github.io/uievents/#dom-uievent-view)` attribute to window, its attribute to related target, and its `[dataTransfer](https://html.spec.whatwg.org/multipage/#dom-dragevent-datatransfer)` attribute to dataTransfer.
10. If e is not `[dragleave](https://html.spec.whatwg.org/multipage/#event-dnd-dragleave)` or `[dragend](https://html.spec.whatwg.org/multipage/#event-dnd-dragend)`, then initialize event's `[cancelable](https://dom.spec.whatwg.org/#dom-event-cancelable)` attribute to true.
11. Initialize event's mouse and key attributes initialized according to the state of the input devices as they would be for user interaction events.

If there is no relevant pointing device, then initialize event's `screenX`, `screenY`, `clientX`, `clientY`, and `button` attributes to 0.
12. [Dispatch](https://dom.spec.whatwg.org/#concept-event-dispatch) event at the specified target element.
13. Set the [drag data store allowed effects state](https://html.spec.whatwg.org/multipage/#drag-data-store-allowed-effects-state) to the current value of dataTransfer's `[effectAllowed](https://html.spec.whatwg.org/multipage/#dom-datatransfer-effectallowed)` attribute. (It can only have changed value if e is `[dragstart](https://html.spec.whatwg.org/multipage/#event-dnd-dragstart)`.)
14. If dataDragStoreWasChanged is true, then set the [drag data store mode](https://html.spec.whatwg.org/multipage/#drag-data-store-mode) back to the [protected mode](https://html.spec.whatwg.org/multipage/#concept-dnd-p).
15. Break the association between dataTransfer and the [drag data store](https://html.spec.whatwg.org/multipage/#drag-data-store).

#### 6.11.5 Processing modelWhen the user attempts to begin a drag operation, the user agent must run the following steps. User agents must act as if these steps were run even if the drag actually started in another document or application and the user agent was not aware that the drag was occurring until it intersected with a document under the user agent's purview.

1. Determine what is being dragged, as follows:

If the drag operation was invoked on a selection, then it is the selection that is being dragged.

Otherwise, if the drag operation was invoked on a `[Document](https://html.spec.whatwg.org/multipage/dom.html#document)`, it is the first element, going up the ancestor chain, starting at the node that the user tried to drag, that has the IDL attribute `[draggable](https://html.spec.whatwg.org/multipage/#dom-draggable)` set to true. If there is no such element, then nothing is being dragged; return, the drag-and-drop operation is never started.

Otherwise, the drag operation was invoked outside the user agent's purview. What is being dragged is defined by the document or application where the drag was started.

`[img](https://html.spec.whatwg.org/multipage/embedded-content.html#the-img-element)` elements and `[a](https://html.spec.whatwg.org/multipage/text-level-semantics.html#the-a-element)` elements with an `[href](https://html.spec.whatwg.org/multipage/links.html#attr-hyperlink-href)` attribute have their `[draggable](https://html.spec.whatwg.org/multipage/#dom-draggable)` attribute set to true by default.
2. [Create a drag data store](https://html.spec.whatwg.org/multipage/#create-a-drag-data-store). All the DND events fired subsequently by the steps in this section must use this [drag data store](https://html.spec.whatwg.org/multipage/#drag-data-store).
3. Establish which DOM node is the source node, as follows:

If it is a selection that is being dragged, then the [source node](https://html.spec.whatwg.org/multipage/#source-node) is the `[Text](https://dom.spec.whatwg.org/#interface-text)` node that the user started the drag on (typically the `[Text](https://dom.spec.whatwg.org/#interface-text)` node that the user originally clicked). If the user did not specify a particular node, for example if the user just told the user agent to begin a drag of "the selection", then the [source node](https://html.spec.whatwg.org/multipage/#source-node) is the first `[Text](https://dom.spec.whatwg.org/#interface-text)` node containing a part of the selection.

Otherwise, if it is an element that is being dragged, then the [source node](https://html.spec.whatwg.org/multipage/#source-node) is the element that is being dragged.

Otherwise, the [source node](https://html.spec.whatwg.org/multipage/#source-node) is part of another document or application. When this specification requires that an event be dispatched at the [source node](https://html.spec.whatwg.org/multipage/#source-node) in this case, the user agent must instead follow the platform-specific conventions relevant to that situation.

Multiple events are fired on the [source node](https://html.spec.whatwg.org/multipage/#source-node) during the course of the drag-and-drop operation.
4. Determine the list of dragged nodes, as follows:

If it is a selection that is being dragged, then the [list of dragged nodes](https://html.spec.whatwg.org/multipage/#list-of-dragged-nodes) contains, in [tree order](https://dom.spec.whatwg.org/#concept-tree-order), every node that is partially or completely included in the selection (including all their ancestors).

Otherwise, the [list of dragged nodes](https://html.spec.whatwg.org/multipage/#list-of-dragged-nodes) contains only the [source node](https://html.spec.whatwg.org/multipage/#source-node), if any.
5. If it is a selection that is being dragged, then add an item to the [drag data store item list](https://html.spec.whatwg.org/multipage/#drag-data-store-item-list), with its properties set as follows:

[The drag data item type string](https://html.spec.whatwg.org/multipage/#the-drag-data-item-type-string)

"`[text/plain](https://www.rfc-editor.org/rfc/rfc2046#section-4.1.3)`"

[The drag data item kind](https://html.spec.whatwg.org/multipage/#the-drag-data-item-kind)

*Text*

The actual data

The text of the selection

Otherwise, if any files are being dragged, then add one item per file to the [drag data store item list](https://html.spec.whatwg.org/multipage/#drag-data-store-item-list), with their properties set as follows:

[The drag data item type string](https://html.spec.whatwg.org/multipage/#the-drag-data-item-type-string)

The MIME type of the file, if known, or "`[application/octet-stream](https://www.rfc-editor.org/rfc/rfc2046#section-4.5.1)`" otherwise.

[The drag data item kind](https://html.spec.whatwg.org/multipage/#the-drag-data-item-kind)

*File*

The actual data

The file's contents and name.

Dragging files can currently only happen from outside a [navigable](https://html.spec.whatwg.org/multipage/document-sequences.html#navigable), for example from a file system manager application.

If the drag initiated outside of the application, the user agent must add items to the [drag data store item list](https://html.spec.whatwg.org/multipage/#drag-data-store-item-list) as appropriate for the data being dragged, honoring platform conventions where appropriate; however, if the platform conventions do not use [MIME types](https://mimesniff.spec.whatwg.org/#mime-type) to label dragged data, the user agent must make a best-effort attempt to map the types to MIME types, and, in any case, all the [drag data item type strings](https://html.spec.whatwg.org/multipage/#the-drag-data-item-type-string) must be [converted to ASCII lowercase](https://infra.spec.whatwg.org/#ascii-lowercase).

User agents may also add one or more items representing the selection or dragged element(s) in other forms, e.g. as HTML.
6. If the [list of dragged nodes](https://html.spec.whatwg.org/multipage/#list-of-dragged-nodes) is not empty, then [extract the microdata from those nodes into a JSON form](https://html.spec.whatwg.org/multipage/microdata.html#extracting-json), and add one item to the [drag data store item list](https://html.spec.whatwg.org/multipage/#drag-data-store-item-list), with its properties set as follows:

[The drag data item type string](https://html.spec.whatwg.org/multipage/#the-drag-data-item-type-string)

`[application/microdata+json](https://html.spec.whatwg.org/multipage/iana.html#application/microdata+json)`

[The drag data item kind](https://html.spec.whatwg.org/multipage/#the-drag-data-item-kind)

*Text*

The actual data

The resulting JSON string.
7. Run the following substeps:

1. Let urls be « ».
2. For each node in the [list of dragged nodes](https://html.spec.whatwg.org/multipage/#list-of-dragged-nodes):

If the node is an `[a](https://html.spec.whatwg.org/multipage/text-level-semantics.html#the-a-element)` element with an `[href](https://html.spec.whatwg.org/multipage/links.html#attr-hyperlink-href)` attribute

Add to urls the result of [encoding-parsing-and-serializing a URL](https://html.spec.whatwg.org/multipage/urls-and-fetching.html#encoding-parsing-and-serializing-a-url) given the element's `[href](https://html.spec.whatwg.org/multipage/links.html#attr-hyperlink-href)` content attribute's value, relative to the element's [node document](https://dom.spec.whatwg.org/#concept-node-document).

If the node is an `[img](https://html.spec.whatwg.org/multipage/embedded-content.html#the-img-element)` element with a `[src](https://html.spec.whatwg.org/multipage/embedded-content.html#attr-img-src)` attribute

Add to urls the result of [encoding-parsing-and-serializing a URL](https://html.spec.whatwg.org/multipage/urls-and-fetching.html#encoding-parsing-and-serializing-a-url) given the element's `[src](https://html.spec.whatwg.org/multipage/embedded-content.html#attr-img-src)` content attribute's value, relative to the element's [node document](https://dom.spec.whatwg.org/#concept-node-document).
3. If urls is still empty, then return.
4. Let url string be the result of concatenating the strings in urls, in the order they were added, separated by a U+000D CARRIAGE RETURN U+000A LINE FEED character pair (CRLF).
5. Add one item to the [drag data store item list](https://html.spec.whatwg.org/multipage/#drag-data-store-item-list), with its properties set as follows:

[The drag data item type string](https://html.spec.whatwg.org/multipage/#the-drag-data-item-type-string)

`[text/uri-list](https://html.spec.whatwg.org/multipage/indices.html#text/uri-list)`

[The drag data item kind](https://html.spec.whatwg.org/multipage/#the-drag-data-item-kind)

*Text*

The actual data

url string
8. Update the [drag data store default feedback](https://html.spec.whatwg.org/multipage/#drag-data-store-default-feedback) as appropriate for the user agent (if the user is dragging the selection, then the selection would likely be the basis for this feedback; if the user is dragging an element, then that element's rendering would be used; if the drag began outside the user agent, then the platform conventions for determining the drag feedback should be used).
9. [Fire a DND event](https://html.spec.whatwg.org/multipage/#fire-a-dnd-event) named `[dragstart](https://html.spec.whatwg.org/multipage/#event-dnd-dragstart)` at the [source node](https://html.spec.whatwg.org/multipage/#source-node).

If the event is canceled, then the drag-and-drop operation should not occur; return.

Since events with no event listeners registered are, almost by definition, never canceled, drag-and-drop is always available to the user if the author does not specifically prevent it.
10. [Fire a pointer event](https://w3c.github.io/pointerevents/#dfn-fire-a-pointer-event) at the [source node](https://html.spec.whatwg.org/multipage/#source-node) named `[pointercancel](https://w3c.github.io/pointerevents/#the-pointercancel-event)`, and fire any other follow-up events as required by Pointer Events. [\[POINTEREVENTS\]](https://html.spec.whatwg.org/multipage/references.html#refsPOINTEREVENTS)
11. [Initiate the drag-and-drop operation](https://html.spec.whatwg.org/multipage/#initiate-the-drag-and-drop-operation) in a manner consistent with platform conventions, and as described below.

The drag-and-drop feedback must be generated from the first of the following sources that is available:

1. The [drag data store bitmap](https://html.spec.whatwg.org/multipage/#drag-data-store-bitmap), if any. In this case, the [drag data store hot spot coordinate](https://html.spec.whatwg.org/multipage/#drag-data-store-hot-spot-coordinate) should be used as hints for where to put the cursor relative to the resulting image. The values are expressed as distances in [CSS pixels](https://drafts.csswg.org/css-values/#px) from the left side and from the top side of the image respectively. [\[CSS\]](https://html.spec.whatwg.org/multipage/references.html#refsCSS)
2. The [drag data store default feedback](https://html.spec.whatwg.org/multipage/#drag-data-store-default-feedback).

From the moment that the user agent is to initiate the drag-and-drop operation, until the end of the drag-and-drop operation, device input events (e.g. mouse and keyboard events) must be suppressed.

During the drag operation, the element directly indicated by the user as the drop target is called the immediate user selection. (Only elements can be selected by the user; other nodes must not be made available as drop targets.) However, the [immediate user selection](https://html.spec.whatwg.org/multipage/#immediate-user-selection) is not necessarily the current target element, which is the element currently selected for the drop part of the drag-and-drop operation.

The [immediate user selection](https://html.spec.whatwg.org/multipage/#immediate-user-selection) changes as the user selects different elements (either by pointing at them with a pointing device, or by selecting them in some other way). The [current target element](https://html.spec.whatwg.org/multipage/#current-target-element) changes when the [immediate user selection](https://html.spec.whatwg.org/multipage/#immediate-user-selection) changes, based on the results of event listeners in the document, as described below.

Both the [current target element](https://html.spec.whatwg.org/multipage/#current-target-element) and the [immediate user selection](https://html.spec.whatwg.org/multipage/#immediate-user-selection) can be null, which means no target element is selected. They can also both be elements in other (DOM-based) documents, or other (non-web) programs altogether. (For example, a user could drag text to a word-processor.) The [current target element](https://html.spec.whatwg.org/multipage/#current-target-element) is initially null.

In addition, there is also a current drag operation, which can take on the values "`none`", "`copy`", "`link`", and "`move`". Initially, it has the value "`[none](https://html.spec.whatwg.org/multipage/#concept-current-drag-operation-none)`". It is updated by the user agent as described in the steps below.

User agents must, as soon as the drag operation is [initiated](https://html.spec.whatwg.org/multipage/#initiate-the-drag-and-drop-operation) and every 350ms (±200ms) thereafter for as long as the drag operation is ongoing, [queue a task](https://html.spec.whatwg.org/multipage/webappapis.html#queue-a-task) to perform the following steps in sequence:

1. If the user agent is still performing the previous iteration of the sequence (if any) when the next iteration becomes due, return for this iteration (effectively "skipping missed frames" of the drag-and-drop operation).
2. [Fire a DND event](https://html.spec.whatwg.org/multipage/#fire-a-dnd-event) named `[drag](https://html.spec.whatwg.org/multipage/#event-dnd-drag)` at the [source node](https://html.spec.whatwg.org/multipage/#source-node). If this event is canceled, the user agent must set the [current drag operation](https://html.spec.whatwg.org/multipage/#current-drag-operation) to "`[none](https://html.spec.whatwg.org/multipage/#concept-current-drag-operation-none)`" (no drag operation).
3. If the `[drag](https://html.spec.whatwg.org/multipage/#event-dnd-drag)` event was not canceled and the user has not ended the drag-and-drop operation, check the state of the drag-and-drop operation, as follows:

1. If the user is indicating a different [immediate user selection](https://html.spec.whatwg.org/multipage/#immediate-user-selection) than during the last iteration (or if this is the first iteration), and if this [immediate user selection](https://html.spec.whatwg.org/multipage/#immediate-user-selection) is not the same as the [current target element](https://html.spec.whatwg.org/multipage/#current-target-element), then update the [current target element](https://html.spec.whatwg.org/multipage/#current-target-element) as follows:

If the new [immediate user selection](https://html.spec.whatwg.org/multipage/#immediate-user-selection) is null

Set the [current target element](https://html.spec.whatwg.org/multipage/#current-target-element) to null also.

If the new [immediate user selection](https://html.spec.whatwg.org/multipage/#immediate-user-selection) is in a non-DOM document or application

Set the [current target element](https://html.spec.whatwg.org/multipage/#current-target-element) to the [immediate user selection](https://html.spec.whatwg.org/multipage/#immediate-user-selection).

Otherwise

[Fire a DND event](https://html.spec.whatwg.org/multipage/#fire-a-dnd-event) named `[dragenter](https://html.spec.whatwg.org/multipage/#event-dnd-dragenter)` at the [immediate user selection](https://html.spec.whatwg.org/multipage/#immediate-user-selection).

If the event is canceled, then set the [current target element](https://html.spec.whatwg.org/multipage/#current-target-element) to the [immediate user selection](https://html.spec.whatwg.org/multipage/#immediate-user-selection).

Otherwise, run the appropriate step from the following list:

If the [immediate user selection](https://html.spec.whatwg.org/multipage/#immediate-user-selection) is a text control (e.g., `[textarea](https://html.spec.whatwg.org/multipage/form-elements.html#the-textarea-element)`, or an `[input](https://html.spec.whatwg.org/multipage/input.html#the-input-element)` element whose `[type](https://html.spec.whatwg.org/multipage/input.html#attr-input-type)` attribute is in the [Text](https://html.spec.whatwg.org/multipage/input.html#text-\(type=text\)-state-and-search-state-\(type=search\)) state) or an [editing host](https://html.spec.whatwg.org/multipage/interaction.html#editing-host) or [editable](https://w3c.github.io/editing/docs/execCommand/#editable) element, and the [drag data store item list](https://html.spec.whatwg.org/multipage/#drag-data-store-item-list) has an item with [the drag data item type string](https://html.spec.whatwg.org/multipage/#the-drag-data-item-type-string) "`[text/plain](https://www.rfc-editor.org/rfc/rfc2046#section-4.1.3)`" and [the drag data item kind](https://html.spec.whatwg.org/multipage/#the-drag-data-item-kind) *text*

Set the [current target element](https://html.spec.whatwg.org/multipage/#current-target-element) to the [immediate user selection](https://html.spec.whatwg.org/multipage/#immediate-user-selection) anyway.

If the [immediate user selection](https://html.spec.whatwg.org/multipage/#immediate-user-selection) is [the body element](https://html.spec.whatwg.org/multipage/dom.html#the-body-element-2)

Leave the [current target element](https://html.spec.whatwg.org/multipage/#current-target-element) unchanged.

Otherwise

[Fire a DND event](https://html.spec.whatwg.org/multipage/#fire-a-dnd-event) named `[dragenter](https://html.spec.whatwg.org/multipage/#event-dnd-dragenter)` at [the body element](https://html.spec.whatwg.org/multipage/dom.html#the-body-element-2), if there is one, or at the `[Document](https://html.spec.whatwg.org/multipage/dom.html#document)` object, if not. Then, set the [current target element](https://html.spec.whatwg.org/multipage/#current-target-element) to [the body element](https://html.spec.whatwg.org/multipage/dom.html#the-body-element-2), regardless of whether that event was canceled or not.
2. If the previous step caused the [current target element](https://html.spec.whatwg.org/multipage/#current-target-element) to change, and if the previous target element was not null or a part of a non-DOM document, then [fire a DND event](https://html.spec.whatwg.org/multipage/#fire-a-dnd-event) named `[dragleave](https://html.spec.whatwg.org/multipage/#event-dnd-dragleave)` at the previous target element, with the new [current target element](https://html.spec.whatwg.org/multipage/#current-target-element) as the specific related target.
3. If the [current target element](https://html.spec.whatwg.org/multipage/#current-target-element) is a DOM element, then [fire a DND event](https://html.spec.whatwg.org/multipage/#fire-a-dnd-event) named `[dragover](https://html.spec.whatwg.org/multipage/#event-dnd-dragover)` at this [current target element](https://html.spec.whatwg.org/multipage/#current-target-element).

If the `[dragover](https://html.spec.whatwg.org/multipage/#event-dnd-dragover)` event is not canceled, run the appropriate step from the following list:

If the [current target element](https://html.spec.whatwg.org/multipage/#current-target-element) is a text control (e.g., `[textarea](https://html.spec.whatwg.org/multipage/form-elements.html#the-textarea-element)`, or an `[input](https://html.spec.whatwg.org/multipage/input.html#the-input-element)` element whose `[type](https://html.spec.whatwg.org/multipage/input.html#attr-input-type)` attribute is in the [Text](https://html.spec.whatwg.org/multipage/input.html#text-\(type=text\)-state-and-search-state-\(type=search\)) state) or an [editing host](https://html.spec.whatwg.org/multipage/interaction.html#editing-host) or [editable](https://w3c.github.io/editing/docs/execCommand/#editable) element, and the [drag data store item list](https://html.spec.whatwg.org/multipage/#drag-data-store-item-list) has an item with [the drag data item type string](https://html.spec.whatwg.org/multipage/#the-drag-data-item-type-string) "`[text/plain](https://www.rfc-editor.org/rfc/rfc2046#section-4.1.3)`" and [the drag data item kind](https://html.spec.whatwg.org/multipage/#the-drag-data-item-kind) *text*

Set the [current drag operation](https://html.spec.whatwg.org/multipage/#current-drag-operation) to either "`[copy](https://html.spec.whatwg.org/multipage/#concept-current-drag-operation-copy)`" or "`[move](https://html.spec.whatwg.org/multipage/#concept-current-drag-operation-move)`", as appropriate given the platform conventions.

Otherwise

Reset the [current drag operation](https://html.spec.whatwg.org/multipage/#current-drag-operation) to "`[none](https://html.spec.whatwg.org/multipage/#concept-current-drag-operation-none)`".

Otherwise (if the `[dragover](https://html.spec.whatwg.org/multipage/#event-dnd-dragover)` event *is* canceled), set the [current drag operation](https://html.spec.whatwg.org/multipage/#current-drag-operation) based on the values of the `[effectAllowed](https://html.spec.whatwg.org/multipage/#dom-datatransfer-effectallowed)` and `[dropEffect](https://html.spec.whatwg.org/multipage/#dom-datatransfer-dropeffect)` attributes of the `[DragEvent](https://html.spec.whatwg.org/multipage/#dragevent)` object's `[dataTransfer](https://html.spec.whatwg.org/multipage/#dom-dragevent-datatransfer)` object as they stood after the event [dispatch](https://dom.spec.whatwg.org/#concept-event-dispatch) finished, as per the following table:

<table><thead><tr><th><code><a href="https://html.spec.whatwg.org/multipage/#dom-datatransfer-effectallowed">effectAllowed</a></code></th><th><code><a href="https://html.spec.whatwg.org/multipage/#dom-datatransfer-dropeffect">dropEffect</a></code></th><th>Drag operation</th></tr></thead><tbody><tr><td>"<code><a href="https://html.spec.whatwg.org/multipage/#dom-datatransfer-effectallowed-uninitialized">uninitialized</a></code>", "<code><a href="https://html.spec.whatwg.org/multipage/#dom-datatransfer-effectallowed-copy">copy</a></code>", "<code><a href="https://html.spec.whatwg.org/multipage/#dom-datatransfer-effectallowed-copylink">copyLink</a></code>", "<code><a href="https://html.spec.whatwg.org/multipage/#dom-datatransfer-effectallowed-copymove">copyMove</a></code>", or "<code><a href="https://html.spec.whatwg.org/multipage/#dom-datatransfer-effectallowed-all">all</a></code>"</td><td>"<code><a href="https://html.spec.whatwg.org/multipage/#dom-datatransfer-dropeffect-copy">copy</a></code>"</td><td>"<code><a href="https://html.spec.whatwg.org/multipage/#concept-current-drag-operation-copy">copy</a></code>"</td></tr><tr><td>"<code><a href="https://html.spec.whatwg.org/multipage/#dom-datatransfer-effectallowed-uninitialized">uninitialized</a></code>", "<code><a href="https://html.spec.whatwg.org/multipage/#dom-datatransfer-effectallowed-link">link</a></code>", "<code><a href="https://html.spec.whatwg.org/multipage/#dom-datatransfer-effectallowed-copylink">copyLink</a></code>", "<code><a href="https://html.spec.whatwg.org/multipage/#dom-datatransfer-effectallowed-linkmove">linkMove</a></code>", or "<code><a href="https://html.spec.whatwg.org/multipage/#dom-datatransfer-effectallowed-all">all</a></code>"</td><td>"<code><a href="https://html.spec.whatwg.org/multipage/#dom-datatransfer-dropeffect-link">link</a></code>"</td><td>"<code><a href="https://html.spec.whatwg.org/multipage/#concept-current-drag-operation-link">link</a></code>"</td></tr><tr><td>"<code><a href="https://html.spec.whatwg.org/multipage/#dom-datatransfer-effectallowed-uninitialized">uninitialized</a></code>", "<code><a href="https://html.spec.whatwg.org/multipage/#dom-datatransfer-effectallowed-move">move</a></code>", "<code><a href="https://html.spec.whatwg.org/multipage/#dom-datatransfer-effectallowed-copymove">copyMove</a></code>", "<code><a href="https://html.spec.whatwg.org/multipage/#dom-datatransfer-effectallowed-linkmove">linkMove</a></code>", or "<code><a href="https://html.spec.whatwg.org/multipage/#dom-datatransfer-effectallowed-all">all</a></code>"</td><td>"<code><a href="https://html.spec.whatwg.org/multipage/#dom-datatransfer-dropeffect-move">move</a></code>"</td><td>"<code><a href="https://html.spec.whatwg.org/multipage/#concept-current-drag-operation-move">move</a></code>"</td></tr><tr><td colspan="2">Any other case</td><td>"<code><a href="https://html.spec.whatwg.org/multipage/#concept-current-drag-operation-none">none</a></code>"</td></tr></tbody></table>
4. Otherwise, if the [current target element](https://html.spec.whatwg.org/multipage/#current-target-element) is not a DOM element, use platform-specific mechanisms to determine what drag operation is being performed (none, copy, link, or move), and set the [current drag operation](https://html.spec.whatwg.org/multipage/#current-drag-operation) accordingly.
5. Update the drag feedback (e.g. the mouse cursor) to match the [current drag operation](https://html.spec.whatwg.org/multipage/#current-drag-operation), as follows:

| Drag operation | Feedback |
| --- | --- |
| "`[copy](https://html.spec.whatwg.org/multipage/#concept-current-drag-operation-copy)`" | Data will be copied if dropped here. |
| "`[link](https://html.spec.whatwg.org/multipage/#concept-current-drag-operation-link)`" | Data will be linked if dropped here. |
| "`[move](https://html.spec.whatwg.org/multipage/#concept-current-drag-operation-move)`" | Data will be moved if dropped here. |
| "`[none](https://html.spec.whatwg.org/multipage/#concept-current-drag-operation-none)`" | No operation allowed, dropping here will cancel the drag-and-drop operation. |
4. Otherwise, if the user ended the drag-and-drop operation (e.g. by releasing the mouse button in a mouse-driven drag-and-drop interface), or if the `[drag](https://html.spec.whatwg.org/multipage/#event-dnd-drag)` event was canceled, then this will be the last iteration. Run the following steps, then stop the drag-and-drop operation:

1. If the [current drag operation](https://html.spec.whatwg.org/multipage/#current-drag-operation) is "`[none](https://html.spec.whatwg.org/multipage/#concept-current-drag-operation-none)`" (no drag operation), or, if the user ended the drag-and-drop operation by canceling it (e.g. by hitting the Escape key), or if the [current target element](https://html.spec.whatwg.org/multipage/#current-target-element) is null, then the drag operation failed. Run these substeps:

1. Let dropped be false.
2. If the [current target element](https://html.spec.whatwg.org/multipage/#current-target-element) is a DOM element, [fire a DND event](https://html.spec.whatwg.org/multipage/#fire-a-dnd-event) named `[dragleave](https://html.spec.whatwg.org/multipage/#event-dnd-dragleave)` at it; otherwise, if it is not null, use platform-specific conventions for drag cancelation.
3. Set the [current drag operation](https://html.spec.whatwg.org/multipage/#current-drag-operation) to "`[none](https://html.spec.whatwg.org/multipage/#concept-current-drag-operation-none)`".

Otherwise, the drag operation might be a success; run these substeps:

1. Let dropped be true.
2. If the [current target element](https://html.spec.whatwg.org/multipage/#current-target-element) is a DOM element, [fire a DND event](https://html.spec.whatwg.org/multipage/#fire-a-dnd-event) named `[drop](https://html.spec.whatwg.org/multipage/#event-dnd-drop)` at it; otherwise, use platform-specific conventions for indicating a drop.
3. If the event is canceled, set the [current drag operation](https://html.spec.whatwg.org/multipage/#current-drag-operation) to the value of the `[dropEffect](https://html.spec.whatwg.org/multipage/#dom-datatransfer-dropeffect)` attribute of the `[DragEvent](https://html.spec.whatwg.org/multipage/#dragevent)` object's `[dataTransfer](https://html.spec.whatwg.org/multipage/#dom-dragevent-datatransfer)` object as it stood after the event [dispatch](https://dom.spec.whatwg.org/#concept-event-dispatch) finished.

Otherwise, the event is not canceled; perform the event's default action, which depends on the exact target as follows:

If the [current target element](https://html.spec.whatwg.org/multipage/#current-target-element) is a text control (e.g., `[textarea](https://html.spec.whatwg.org/multipage/form-elements.html#the-textarea-element)`, or an `[input](https://html.spec.whatwg.org/multipage/input.html#the-input-element)` element whose `[type](https://html.spec.whatwg.org/multipage/input.html#attr-input-type)` attribute is in the [Text](https://html.spec.whatwg.org/multipage/input.html#text-\(type=text\)-state-and-search-state-\(type=search\)) state) or an [editing host](https://html.spec.whatwg.org/multipage/interaction.html#editing-host) or [editable](https://w3c.github.io/editing/docs/execCommand/#editable) element, and the [drag data store item list](https://html.spec.whatwg.org/multipage/#drag-data-store-item-list) has an item with [the drag data item type string](https://html.spec.whatwg.org/multipage/#the-drag-data-item-type-string) "`[text/plain](https://www.rfc-editor.org/rfc/rfc2046#section-4.1.3)`" and [the drag data item kind](https://html.spec.whatwg.org/multipage/#the-drag-data-item-kind) *text*

Insert the actual data of the first item in the [drag data store item list](https://html.spec.whatwg.org/multipage/#drag-data-store-item-list) to have [a drag data item type string](https://html.spec.whatwg.org/multipage/#the-drag-data-item-type-string) of "`[text/plain](https://www.rfc-editor.org/rfc/rfc2046#section-4.1.3)`" and [a drag data item kind](https://html.spec.whatwg.org/multipage/#the-drag-data-item-kind) that is *text* into the text control or [editing host](https://html.spec.whatwg.org/multipage/interaction.html#editing-host) or [editable](https://w3c.github.io/editing/docs/execCommand/#editable) element in a manner consistent with platform-specific conventions (e.g. inserting it at the current mouse cursor position, or inserting it at the end of the field).

Otherwise

Reset the [current drag operation](https://html.spec.whatwg.org/multipage/#current-drag-operation) to "`[none](https://html.spec.whatwg.org/multipage/#concept-current-drag-operation-none)`".
2. [Fire a DND event](https://html.spec.whatwg.org/multipage/#fire-a-dnd-event) named `[dragend](https://html.spec.whatwg.org/multipage/#event-dnd-dragend)` at the [source node](https://html.spec.whatwg.org/multipage/#source-node).
3. Run the appropriate steps from the following list as the default action of the `[dragend](https://html.spec.whatwg.org/multipage/#event-dnd-dragend)` event:

If dropped is true, the [current target element](https://html.spec.whatwg.org/multipage/#current-target-element) is a *text control* (see below), the [current drag operation](https://html.spec.whatwg.org/multipage/#current-drag-operation) is "`[move](https://html.spec.whatwg.org/multipage/#concept-current-drag-operation-move)`", and the source of the drag-and-drop operation is a selection in the DOM that is entirely contained within an [editing host](https://html.spec.whatwg.org/multipage/interaction.html#editing-host)

[Delete the selection](https://w3c.github.io/editing/docs/execCommand/#delete-the-selection).

If dropped is true, the [current target element](https://html.spec.whatwg.org/multipage/#current-target-element) is a *text control* (see below), the [current drag operation](https://html.spec.whatwg.org/multipage/#current-drag-operation) is "`[move](https://html.spec.whatwg.org/multipage/#concept-current-drag-operation-move)`", and the source of the drag-and-drop operation is a selection in a text control

The user agent should delete the dragged selection from the relevant text control.

If dropped is false or if the [current drag operation](https://html.spec.whatwg.org/multipage/#current-drag-operation) is "`[none](https://html.spec.whatwg.org/multipage/#concept-current-drag-operation-none)`"

The drag was canceled. If the platform conventions dictate that this be represented to the user (e.g. by animating the dragged selection going back to the source of the drag-and-drop operation), then do so.

Otherwise

The event has no default action.

For the purposes of this step, a *text control* is a `[textarea](https://html.spec.whatwg.org/multipage/form-elements.html#the-textarea-element)` element or an `[input](https://html.spec.whatwg.org/multipage/input.html#the-input-element)` element whose `[type](https://html.spec.whatwg.org/multipage/input.html#attr-input-type)` attribute is in one of the [Text](https://html.spec.whatwg.org/multipage/input.html#text-\(type=text\)-state-and-search-state-\(type=search\)), [Search](https://html.spec.whatwg.org/multipage/input.html#text-\(type=text\)-state-and-search-state-\(type=search\)), [Tel](https://html.spec.whatwg.org/multipage/input.html#telephone-state-\(type=tel\)), [URL](https://html.spec.whatwg.org/multipage/input.html#url-state-\(type=url\)), [Email](https://html.spec.whatwg.org/multipage/input.html#email-state-\(type=email\)), [Password](https://html.spec.whatwg.org/multipage/input.html#password-state-\(type=password\)), or [Number](https://html.spec.whatwg.org/multipage/input.html#number-state-\(type=number\)) states.

User agents are encouraged to consider how to react to drags near the edge of scrollable regions. For example, if a user drags a link to the bottom of the [viewport](https://drafts.csswg.org/css2/#viewport) on a long page, it might make sense to scroll the page so that the user can drop the link lower on the page.

This model is independent of which `[Document](https://html.spec.whatwg.org/multipage/dom.html#document)` object the nodes involved are from; the events are fired as described above and the rest of the processing model runs as described above, irrespective of how many documents are involved in the operation.

#### 6.11.6 Events summary*This section is non-normative.*

The following events are involved in the drag-and-drop model.

| Event name | Target | Cancelable? | [Drag data store mode](https://html.spec.whatwg.org/multipage/#drag-data-store-mode) | `[dropEffect](https://html.spec.whatwg.org/multipage/#dom-datatransfer-dropeffect)` | Default Action |
| --- | --- | --- | --- | --- | --- |
| `dragstart`  [HTMLElement/dragstart\_event](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/dragstart_event "The dragstart event is fired when the user starts dragging an element or text selection.")  Support in all current engines.  Firefox9+Safari3.1+Chrome1+  ---  Opera12+Edge79+  ---  Edge (Legacy)12+Internet Explorer9+  ---  Firefox Android?Safari iOS?Chrome Android?WebView Android?Samsung Internet?Opera Android12+ | [Source node](https://html.spec.whatwg.org/multipage/#source-node) | ✓ Cancelable | [Read/write mode](https://html.spec.whatwg.org/multipage/#concept-dnd-rw) | "`[none](https://html.spec.whatwg.org/multipage/#dom-datatransfer-dropeffect-none)`" | Initiate the drag-and-drop operation |
| `drag`  [HTMLElement/drag\_event](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/drag_event "The drag event is fired every few hundred milliseconds as an element or text selection is being dragged by the user.")  Support in all current engines.  Firefox9+Safari3.1+Chrome1+  ---  Opera12+Edge79+  ---  Edge (Legacy)12+Internet Explorer9+  ---  Firefox Android?Safari iOS?Chrome Android?WebView Android?Samsung Internet?Opera Android12+ | [Source node](https://html.spec.whatwg.org/multipage/#source-node) | ✓ Cancelable | [Protected mode](https://html.spec.whatwg.org/multipage/#concept-dnd-p) | "`[none](https://html.spec.whatwg.org/multipage/#dom-datatransfer-dropeffect-none)`" | Continue the drag-and-drop operation |
| `dragenter`  [HTMLElement/dragenter\_event](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/dragenter_event "The dragenter event is fired when a dragged element or text selection enters a valid drop target.")  Support in all current engines.  Firefox9+Safari3.1+Chrome1+  ---  Opera12+Edge79+  ---  Edge (Legacy)12+Internet Explorer9+  ---  Firefox Android?Safari iOS?Chrome Android?WebView Android?Samsung Internet?Opera Android12+ | [Immediate user selection](https://html.spec.whatwg.org/multipage/#immediate-user-selection) or [the body element](https://html.spec.whatwg.org/multipage/dom.html#the-body-element-2) | ✓ Cancelable | [Protected mode](https://html.spec.whatwg.org/multipage/#concept-dnd-p) | [Based on `effectAllowed` value](https://html.spec.whatwg.org/multipage/#dropEffect-initialisation) | Reject [immediate user selection](https://html.spec.whatwg.org/multipage/#immediate-user-selection) as potential [target element](https://html.spec.whatwg.org/multipage/#current-target-element) |
| `dragleave`  [HTMLElement/dragleave\_event](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/dragleave_event "The dragleave event is fired when a dragged element or text selection leaves a valid drop target.")  Support in all current engines.  Firefox9+Safari3.1+Chrome1+  ---  Opera12+Edge79+  ---  Edge (Legacy)12+Internet Explorer9+  ---  Firefox Android?Safari iOS?Chrome Android?WebView Android?Samsung Internet?Opera Android12+ | [Previous target element](https://html.spec.whatwg.org/multipage/#current-target-element) | — | [Protected mode](https://html.spec.whatwg.org/multipage/#concept-dnd-p) | "`[none](https://html.spec.whatwg.org/multipage/#dom-datatransfer-dropeffect-none)`" | None |
| `dragover`  [HTMLElement/dragover\_event](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/dragover_event "The dragover event is fired when an element or text selection is being dragged over a valid drop target (every few hundred milliseconds).")  Support in all current engines.  Firefox9+Safari3.1+Chrome1+  ---  Opera12+Edge79+  ---  Edge (Legacy)12+Internet Explorer9+  ---  Firefox Android?Safari iOS?Chrome Android?WebView Android?Samsung Internet?Opera Android12+ | [Current target element](https://html.spec.whatwg.org/multipage/#current-target-element) | ✓ Cancelable | [Protected mode](https://html.spec.whatwg.org/multipage/#concept-dnd-p) | [Based on `effectAllowed` value](https://html.spec.whatwg.org/multipage/#dropEffect-initialisation) | Reset the [current drag operation](https://html.spec.whatwg.org/multipage/#current-drag-operation) to "none" |
| `drop`  [HTMLElement/drop\_event](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/drop_event "The drop event is fired when an element or text selection is dropped on a valid drop target. To ensure that the drop event always fires as expected, you should always include a preventDefault() call in the part of your code which handles the dragover event.")  Support in all current engines.  Firefox9+Safari3.1+Chrome1+  ---  Opera12+Edge79+  ---  Edge (Legacy)12+Internet Explorer9+  ---  Firefox Android?Safari iOS?Chrome Android?WebView Android?Samsung Internet?Opera Android12+ | [Current target element](https://html.spec.whatwg.org/multipage/#current-target-element) | ✓ Cancelable | [Read-only mode](https://html.spec.whatwg.org/multipage/#concept-dnd-ro) | [Current drag operation](https://html.spec.whatwg.org/multipage/#current-drag-operation) | Varies |
| `dragend`  [HTMLElement/dragend\_event](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/dragend_event "The dragend event is fired when a drag operation is being ended (by releasing a mouse button or hitting the escape key).")  Support in all current engines.  Firefox9+Safari3.1+Chrome1+  ---  Opera12+Edge79+  ---  Edge (Legacy)12+Internet Explorer9+  ---  Firefox Android?Safari iOS?Chrome Android?WebView Android?Samsung Internet?Opera Android12+ | [Source node](https://html.spec.whatwg.org/multipage/#source-node) | — | [Protected mode](https://html.spec.whatwg.org/multipage/#concept-dnd-p) | [Current drag operation](https://html.spec.whatwg.org/multipage/#current-drag-operation) | Varies |

All of these events bubble, are composed, and the `[effectAllowed](https://html.spec.whatwg.org/multipage/#dom-datatransfer-effectallowed)` attribute always has the value it had after the `[dragstart](https://html.spec.whatwg.org/multipage/#event-dnd-dragstart)` event, defaulting to "`[uninitialized](https://html.spec.whatwg.org/multipage/#dom-datatransfer-effectallowed-uninitialized)`" in the `[dragstart](https://html.spec.whatwg.org/multipage/#event-dnd-dragstart)` event.

#### 6.11.7 The `[draggable](https://html.spec.whatwg.org/multipage/#attr-draggable)` attribute[Global\_attributes/draggable](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/draggable "The draggable global attribute is an enumerated attribute that indicates whether the element can be dragged, either with native browser behavior or the HTML Drag and Drop API.")

Support in all current engines.

Firefox2+Safari5+Chrome4+

---

Opera12+Edge79+

---

Edge (Legacy)12+Internet ExplorerYes

---

Firefox Android?Safari iOS?Chrome Android?WebView Android?Samsung Internet?Opera Android?

All [HTML elements](https://html.spec.whatwg.org/multipage/infrastructure.html#html-elements) may have the `draggable` content attribute set. The `[draggable](https://html.spec.whatwg.org/multipage/#attr-draggable)` attribute is an [enumerated attribute](https://html.spec.whatwg.org/multipage/common-microsyntaxes.html#enumerated-attribute) with the following keywords and states:

| Keyword | State | Brief description |
| --- | --- | --- |
| `true` | true | The element will be draggable. |
| `false` | false | The element will not be draggable. |

The attribute's *[missing value default](https://html.spec.whatwg.org/multipage/common-microsyntaxes.html#missing-value-default)* and *[invalid value default](https://html.spec.whatwg.org/multipage/common-microsyntaxes.html#invalid-value-default)* are both the auto state. The auto state uses the default behavior of the user agent.

An element with a `[draggable](https://html.spec.whatwg.org/multipage/#attr-draggable)` attribute should also have a `[title](https://html.spec.whatwg.org/multipage/dom.html#attr-title)` attribute that names the element for the purpose of non-visual interactions.

`element.[draggable](https://html.spec.whatwg.org/multipage/#dom-draggable) [ = value ]`

Returns true if the element is draggable; otherwise, returns false.

Can be set, to override the default and set the `[draggable](https://html.spec.whatwg.org/multipage/#attr-draggable)` content attribute.

The `draggable` IDL attribute, whose value depends on the content attribute's in the way described below, controls whether or not the element is draggable. Generally, only text selections are draggable, but elements whose `[draggable](https://html.spec.whatwg.org/multipage/#dom-draggable)` IDL attribute is true become draggable as well.

If an element's `[draggable](https://html.spec.whatwg.org/multipage/#attr-draggable)` content attribute has the state [true](https://html.spec.whatwg.org/multipage/#attr-draggable-true-state), the `[draggable](https://html.spec.whatwg.org/multipage/#dom-draggable)` IDL attribute must return true.

Otherwise, if the element's `[draggable](https://html.spec.whatwg.org/multipage/#attr-draggable)` content attribute has the state [false](https://html.spec.whatwg.org/multipage/#attr-draggable-false-state), the `[draggable](https://html.spec.whatwg.org/multipage/#dom-draggable)` IDL attribute must return false.

Otherwise, the element's `[draggable](https://html.spec.whatwg.org/multipage/#attr-draggable)` content attribute has the state [auto](https://html.spec.whatwg.org/multipage/#attr-draggable-auto-state). If the element is an `[img](https://html.spec.whatwg.org/multipage/embedded-content.html#the-img-element)` element, an `[object](https://html.spec.whatwg.org/multipage/iframe-embed-object.html#the-object-element)` element that [represents](https://html.spec.whatwg.org/multipage/dom.html#represents) an image, or an `[a](https://html.spec.whatwg.org/multipage/text-level-semantics.html#the-a-element)` element with an `[href](https://html.spec.whatwg.org/multipage/links.html#attr-hyperlink-href)` content attribute, the `[draggable](https://html.spec.whatwg.org/multipage/#dom-draggable)` IDL attribute must return true; otherwise, the `[draggable](https://html.spec.whatwg.org/multipage/#dom-draggable)` IDL attribute must return false.

If the `[draggable](https://html.spec.whatwg.org/multipage/#dom-draggable)` IDL attribute is set to the value false, the `[draggable](https://html.spec.whatwg.org/multipage/#attr-draggable)` content attribute must be set to the literal value "`false`". If the `[draggable](https://html.spec.whatwg.org/multipage/#dom-draggable)` IDL attribute is set to the value true, the `[draggable](https://html.spec.whatwg.org/multipage/#attr-draggable)` content attribute must be set to the literal value "`true`".

#### 6.11.8 Security risks in the drag-and-drop modelUser agents must not make the data added to the `[DataTransfer](https://html.spec.whatwg.org/multipage/#datatransfer)` object during the `[dragstart](https://html.spec.whatwg.org/multipage/#event-dnd-dragstart)` event available to scripts until the `[drop](https://html.spec.whatwg.org/multipage/#event-dnd-drop)` event, because otherwise, if a user were to drag sensitive information from one document to a second document, crossing a hostile third document in the process, the hostile document could intercept the data.

For the same reason, user agents must consider a drop to be successful only if the user specifically ended the drag operation — if any scripts end the drag operation, it must be considered unsuccessful (canceled) and the `[drop](https://html.spec.whatwg.org/multipage/#event-dnd-drop)` event must not be fired.

User agents should take care to not start drag-and-drop operations in response to script actions. For example, in a mouse-and-window environment, if a script moves a window while the user has their mouse button depressed, the UA would not consider that to start a drag. This is important because otherwise UAs could cause data to be dragged from sensitive sources and dropped into hostile documents without the user's consent.

User agents should filter potentially active (scripted) content (e.g. HTML) when it is dragged and when it is dropped, using a safelist of known-safe features. Similarly, [relative URLs](https://url.spec.whatwg.org/#syntax-url-relative) should be turned into absolute URLs to avoid references changing in unexpected ways. This specification does not specify how this is performed.

Consider a hostile page providing some content and getting the user to select and drag and drop (or indeed, copy and paste) that content to a victim page's `[contenteditable](https://html.spec.whatwg.org/multipage/interaction.html#attr-contenteditable)` region. If the browser does not ensure that only safe content is dragged, potentially unsafe content such as scripts and event handlers in the selection, once dropped (or pasted) into the victim site, get the privileges of the victim site. This would thus enable a cross-site scripting attack.

[← 6 User interaction](https://html.spec.whatwg.org/multipage/interaction.html) — [Table of Contents](https://html.spec.whatwg.org/multipage/) — [6.12 The popover attribute →](https://html.spec.whatwg.org/multipage/popover.html)