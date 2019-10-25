/**
 * @license Copyright (c) 2003-2015, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md or http://ckeditor.com/license
 */
CKEDITOR.editorConfig = function ( config ) {
    config.extraPlugins = 'filebrowser';
    config.plugins += ',filebrowser,oembed';
    config.skin         = 'office2013';
    // config.font_style =
    // {
    //     element		: 'span',
    //     styles		: { 'font-family' : '#(tex)' },
    //     overrides	: [ { element : 'font', attributes : { 'face' : null } } ]
    // };
    // config.font_defaultLabel = '\'tex\'';
    // config.fontSize_defaultLabel = '19.2px';
    config.allowedContent = true;
    config.toolbarGroups  = [
        { name: 'clipboard', groups: ['clipboard', 'undo'] },
        { name: 'editing', groups: ['find', 'selection', 'spellchecker', 'editing'] },
        { name: 'links', groups: ['links'] },
        { name: 'insert', groups: ['insert'] },
        { name: 'forms', groups: ['forms'] },
        { name: 'tools', groups: ['tools'] },
        { name: 'document', groups: ['mode', 'document', 'doctools'] },
        { name: 'others', groups: ['others'] },
        { name: 'basicstyles', groups: ['basicstyles', 'cleanup'] },
        { name: 'paragraph', groups: ['list', 'indent', 'blocks', 'align', 'bidi', 'paragraph'] },
        { name: 'styles', groups: ['styles'] },
        { name: 'colors', groups: ['colors'] }
    ];
    
    config.removeButtons = 'Print,Styles,Scayt,Anchor,About,Size,FontSize,Save,NewPage,Preview,Templates,Form,Checkbox,Radio,TextField,Textarea,Select,Button,ImageButton,HiddenField,Flash,Anchor,Styles,About,CreateDiv,Language,BidiRtl,BidiLtr';
    
};