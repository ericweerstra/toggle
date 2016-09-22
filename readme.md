# Toggle
Makes toggling DOM elements easy and adjustable.

[Demo](http://visualformation.com/toggle)   
[Demo code](https://github.com/ericweerstra/toggle/tree/demo)

## Basic example

```
<a id="trigger"
   data-module="toggle/Trigger"
   data-options='{"targets":"toggle"}'>Trigger</a>
   
<p id="toggle"
   data-module="toggle/Toggle"'>Toggle</p>
```

## Trigger options
* `targets` - Comma separated string of (multiple) toggle id's
* `toggle` - Set this options to true if you want the trigger to act like a toggle itself
* `event` - Trigger event, default is 'click'
* `method` - Options are 'activate', 'deactivate' and (default) 'switch'
* `preventDefault` - Cancel the event, default is true 
* `group` - Optional group name

## Toggle options
* `attribute` - The Toggle attribute, default is data-toggle-active but it can be a Aria attribute like aria-hidden
* `activeState` - Value for the Toggle active state attribute, default true
* `inActiveState` - Value for the Toggle inactive state attribute, default false
* `group` - Optional group name

## Requirements
Uses [ConditionerJS](http://conditionerjs.com/) for initialization but it can be used without.
