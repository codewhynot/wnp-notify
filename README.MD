# @wnp/notify

### <a href="https://whynotpack.github.io/">Whynotpack</a>

###### Installation
`npm install @wnp/notify --save`

###### Import
`import { Notify } from "@wnp/notify"`

###### Initialisation

`const notify = new Notify()`

###### Initialisation with params

`const notify = new Notify({...params})`

###### Available params

<table>
    <tr>
        <td>
            Param
        </td>
        <td>Type</td>
        <td>Default value</td>
    </tr>
    <tr>
        <td>
            <p>max_count</p>
            <span>Max count of notifications in window</span>
        </td>
        <td>number</td>
        <td>5</td>
    </tr>
    <tr>
        <td>
            <p>default_message</p>
            <span>Standard message header</span>
        </td>
        <td>string</td>
        <td>"Whynotpack notify"</td>
    </tr>
    <tr>
        <td>
            <p>selector</p>
            <span>The selector in which you want to put the plugin</span>
        </td>
        <td>string</td>
        <td>'body'</td>
    </tr>
    <tr>
        <td>
            <p>link_title</p>
            <span>The text for the button that expands the notification</span>
        </td>
        <td>string</td>
        <td>'Show'</td>
    </tr>
    <tr>
        <td>
            <p>default_class</p>
            <span>Standard notification class</span>
        </td>
        <td>string</td>
        <td>'default'</td>
    </tr>
    <tr>
        <td>
            <p>default_styles</p>
            <span>Set default styles</span>
        </td>
        <td>boolean</td>
        <td>true</td>
    </tr>
</table>

------------------------
###### For example
<pre>
const notify = new Notify ({
    max_count: 5, 
    default_message: 'Hello world', 
    default_styles: true
})
</pre>

------------------------

###### Display notification

`notify()`

###### Display notification with params

`notify({...params})`

###### Available params


<table>
    <tr>
        <td>
            Param
        </td>
        <td>Type</td>
        <td>Default value</td>
    </tr>
    <tr>
        <td>
            <p>type</p>
            <span>Type of notice</span>
        </td>
        <td>string</td>
        <td>
            <p>'error'</p>
            <p>'success'</p>
            <p>'info'</p>
        </td>
    </tr>
    <tr>
        <td>
            <p>title</p>
            <span>Current notification title</span>
        </td>
        <td>string</td>
        <td>default_message ("Whynotpack notify")</td>
    </tr>
    <tr>
        <td>
            <p>description</p>
            <span>Description of the notice</span>
        </td>
        <td>string</td>
        <td>" "</td>
    </tr>
    <tr>
        <td>
            <p>link_title</p>
            <span>The text for the button that expands the notification</span>
        </td>
        <td>string</td>
        <td>link_title ('Show')</td>
    </tr>
    <tr>
        <td>
            <p>custom_class</p>
            <span>Current notification class</span>
        </td>
        <td>string</td>
        <td>default_class('default')</td>
    </tr>
    <tr>
        <td>
            <p>auto_delete</p>
            <span>Auto delete current notification</span>
        </td>
        <td>boolean</td>
        <td>false</td>
    </tr>
    <tr>
        <td>
            <p>delay</p>
            <span>Delay for deleting notification</span>
        </td>
        <td>number</td>
        <td>5</td>
    </tr>
</table>

-----------------------
###### For example

<pre>
notify({
    type: 'success',
    title: 'Hello world',
    description: 'My first notice',
    link_title: 'Show more',
    auto_delete: true,
    delay: 4
})
</pre>

## Enjoy ;)

