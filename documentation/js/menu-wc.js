'use strict';

customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`<nav>
    <ul class="list">
        <li class="title">
            <a href="index.html" data-type="index-link">dco-me documentation</a>
        </li>
        <li class="divider"></li>
        ${ isNormalMode ? `<div id="book-search-input" role="search">
    <input type="text" placeholder="Type to search">
</div>
` : '' }
        <li class="chapter">
            <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
            <ul class="links">
                    <li class="link">
                        <a href="overview.html" data-type="chapter-link">
                            <span class="icon ion-ios-keypad"></span>Overview
                        </a>
                    </li>
                    <li class="link">
                        <a href="index.html" data-type="chapter-link">
                            <span class="icon ion-ios-paper"></span>README
                        </a>
                    </li>
                    <li class="link">
                        <a href="dependencies.html"
                            data-type="chapter-link">
                            <span class="icon ion-ios-list"></span>Dependencies
                        </a>
                    </li>
            </ul>
        </li>
        <li class="chapter modules">
            <a data-type="chapter-link" href="modules.html">
                <div class="menu-toggler linked" data-toggle="collapse"
                    ${ isNormalMode ? 'data-target="#modules-links"' : 'data-target="#xs-modules-links"' }>
                    <span class="icon ion-ios-archive"></span>
                    <span class="link-name">Modules</span>
                    <span class="icon ion-ios-arrow-down"></span>
                </div>
            </a>
            <ul class="links collapse"
            ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                    <li class="link">
                        <a href="modules/AppModule.html" data-type="entity-link">AppModule</a>
                            <li class="chapter inner">
                                <div class="simple menu-toggler" data-toggle="collapse"
                                    ${ isNormalMode ? 'data-target="#components-links-module-AppModule-a9e88fa76ba1426578b075f6e6724102"' : 'data-target="#xs-components-links-module-AppModule-a9e88fa76ba1426578b075f6e6724102"' }>
                                    <span class="icon ion-md-cog"></span>
                                    <span>Components</span>
                                    <span class="icon ion-ios-arrow-down"></span>
                                </div>
                                <ul class="links collapse"
                                    ${ isNormalMode ? 'id="components-links-module-AppModule-a9e88fa76ba1426578b075f6e6724102"' : 'id="xs-components-links-module-AppModule-a9e88fa76ba1426578b075f6e6724102"' }>
                                        <li class="link">
                                            <a href="components/AppComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">AppComponent</a>
                                        </li>
                                        <li class="link">
                                            <a href="components/CampaignComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">CampaignComponent</a>
                                        </li>
                                        <li class="link">
                                            <a href="components/CampaignCreateComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">CampaignCreateComponent</a>
                                        </li>
                                        <li class="link">
                                            <a href="components/CampaignDetailComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">CampaignDetailComponent</a>
                                        </li>
                                        <li class="link">
                                            <a href="components/CampaignEditComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">CampaignEditComponent</a>
                                        </li>
                                        <li class="link">
                                            <a href="components/DcoComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">DcoComponent</a>
                                        </li>
                                        <li class="link">
                                            <a href="components/DcoCreateComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">DcoCreateComponent</a>
                                        </li>
                                        <li class="link">
                                            <a href="components/DcoDetailComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">DcoDetailComponent</a>
                                        </li>
                                        <li class="link">
                                            <a href="components/DcoDialogComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">DcoDialogComponent</a>
                                        </li>
                                        <li class="link">
                                            <a href="components/DcoEditComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">DcoEditComponent</a>
                                        </li>
                                        <li class="link">
                                            <a href="components/LoginComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">LoginComponent</a>
                                        </li>
                                        <li class="link">
                                            <a href="components/NotfoundComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">NotfoundComponent</a>
                                        </li>
                                        <li class="link">
                                            <a href="components/SignupComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">SignupComponent</a>
                                        </li>
                                </ul>
                            </li>
                    </li>
            </ul>
        </li>
        <li class="chapter">
            <div class="simple menu-toggler" data-toggle="collapse"
            ${ isNormalMode ? 'data-target="#classes-links"' : 'data-target="#xs-classes-links"' }>
                <span class="icon ion-ios-paper"></span>
                <span>Classes</span>
                <span class="icon ion-ios-arrow-down"></span>
            </div>
            <ul class="links collapse"
            ${ isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"' }>
                    <li class="link">
                        <a href="classes/Campaign.html" data-type="entity-link">Campaign</a>
                    </li>
                    <li class="link">
                        <a href="classes/CampaignDataSource.html" data-type="entity-link">CampaignDataSource</a>
                    </li>
                    <li class="link">
                        <a href="classes/Dco.html" data-type="entity-link">Dco</a>
                    </li>
                    <li class="link">
                        <a href="classes/DcoDataSource.html" data-type="entity-link">DcoDataSource</a>
                    </li>
            </ul>
        </li>
                <li class="chapter">
                    <div class="simple menu-toggler" data-toggle="collapse"
                        ${ isNormalMode ? 'data-target="#injectables-links"' : 'data-target="#xs-injectables-links"' }>
                        <span class="icon ion-md-arrow-round-down"></span>
                        <span>Injectables</span>
                        <span class="icon ion-ios-arrow-down"></span>
                    </div>
                    <ul class="links collapse"
                    ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                            <li class="link">
                                <a href="injectables/ApiService.html" data-type="entity-link">ApiService</a>
                            </li>
                    </ul>
                </li>
        <li class="chapter">
            <div class="simple menu-toggler" data-toggle="collapse"
                ${ isNormalMode ? 'data-target="#interfaces-links"' : 'data-target="#xs-interfaces-links"' }>
                <span class="icon ion-md-information-circle-outline"></span>
                <span>Interfaces</span>
                <span class="icon ion-ios-arrow-down"></span>
            </div>
            <ul class="links collapse"
            ${ isNormalMode ? ' id="interfaces-links"' : 'id="xs-interfaces-links"' }>
                    <li class="link">
                        <a href="interfaces/Dialog.html" data-type="entity-link">Dialog</a>
                    </li>
                    <li class="link">
                        <a href="interfaces/Disclaimers.html" data-type="entity-link">Disclaimers</a>
                    </li>
                    <li class="link">
                        <a href="interfaces/FileSystemDirectoryEntry.html" data-type="entity-link">FileSystemDirectoryEntry</a>
                    </li>
                    <li class="link">
                        <a href="interfaces/FileSystemDirectoryReader.html" data-type="entity-link">FileSystemDirectoryReader</a>
                    </li>
                    <li class="link">
                        <a href="interfaces/FileSystemEntry.html" data-type="entity-link">FileSystemEntry</a>
                    </li>
                    <li class="link">
                        <a href="interfaces/FileSystemFileEntry.html" data-type="entity-link">FileSystemFileEntry</a>
                    </li>
                    <li class="link">
                        <a href="interfaces/FileSystemFlags.html" data-type="entity-link">FileSystemFlags</a>
                    </li>
                    <li class="link">
                        <a href="interfaces/Offers.html" data-type="entity-link">Offers</a>
                    </li>
                    <li class="link">
                        <a href="interfaces/Vehiclemake.html" data-type="entity-link">Vehiclemake</a>
                    </li>
                    <li class="link">
                        <a href="interfaces/Vehiclemodel.html" data-type="entity-link">Vehiclemodel</a>
                    </li>
            </ul>
        </li>
        <li class="chapter">
            <div class="simple menu-toggler" data-toggle="collapse"
            ${ isNormalMode ? 'data-target="#miscellaneous-links"' : 'data-target="#xs-miscellaneous-links"' }>
                <span class="icon ion-ios-cube"></span>
                <span>Miscellaneous</span>
                <span class="icon ion-ios-arrow-down"></span>
            </div>
            <ul class="links collapse"
            ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                    <li class="link">
                      <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                    </li>
            </ul>
        </li>
            <li class="chapter">
                <a data-type="chapter-link" href="routes.html"><span class="icon ion-ios-git-branch"></span>Routes</a>
            </li>
        <li class="chapter">
            <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
        </li>
        <li class="divider"></li>
        <li class="copyright">
                Documentation generated using <a href="https://compodoc.app/" target="_blank">
                            <img data-src="images/compodoc-vectorise.svg" class="img-responsive" data-type="compodoc-logo">
                </a>
        </li>
    </ul>
</nav>`);
        this.innerHTML = tp.strings;
    }
});
