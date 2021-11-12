/* eslint-disable class-methods-use-this */
import { LitElement, html, css } from 'lit';
import { property, query } from 'lit/decorators.js';
import '@umbraco-ui/uui-input';
import '@umbraco-ui/uui-button';
import '@umbraco-ui/uui-table';
import '@umbraco-ui/uui-box';

export class TodontApp extends LitElement {
  static styles = css`
    :host {
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: flex-start;
      max-width: 960px;
      margin: 24px auto;
      --uui-button-height: 33px;
    }

    [slot='header'] {
      font-weight: 700;
    }

    #todont-container,
    #add-todont-container {
      width: 90vw;
    }

    #add-todont-container {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    #add-todont-input {
      flex-grow: 1;
      margin: 0 0.5em;
    }

    #add-todont-button {
      margin: 0 0.5em;
    }

    #action-column {
      width: 20%;
      text-align: center;
    }

    uui-box {
      margin-top: 2rem;
    }
  `;

  @query('#add-todont-input ')
  addToDontInput?: any;

  @property({ attribute: false })
  todonts: string[] = [];

  addToDont() {
    if (!this.addToDontInput.value) return;

    this.todonts = [...this.todonts, this.addToDontInput.value];
    this.addToDontInput.value = '';
    console.log(this.todonts);
  }

  removeToDont(i: number) {
    const removedTodonts = this.todonts.filter(
      todont => this.todonts.indexOf(todont) !== i
    );
    this.todonts = [...removedTodonts];
  }

  render() {
    return html`
      <uui-box>
        <div slot="header">I will not...</div>
        <div
          slot="main"
          id="add-todont-container"
          @keyup=${(e: KeyboardEvent) => {
            if (e.key === 'Enter') this.addToDont();
          }}
        >
          <uui-input id="add-todont-input" hide-label></uui-input>
          <uui-button
            label="Add to don't"
            look="positive"
            id="add-todont-button"
            @click=${this.addToDont}
            >Add todont</uui-button
          >
        </div></uui-box
      >

      <uui-box>
        <uui-table slot="main" id="todont-container">
          <uui-table-column></uui-table-column>
          <uui-table-column id="action-column"></uui-table-column>
          <uui-table-head
            ><uui-table-head-cell>To-don't</uui-table-head-cell
            ><uui-table-head-cell>Action</uui-table-head-cell></uui-table-head
          >
          ${this.todonts.map(
            (todont, index) =>
              html`<uui-table-row
                ><uui-table-cell>${todont}</uui-table-cell
                ><uui-table-cell
                  ><uui-button
                    look="danger"
                    label="Remove to don't"
                    @click=${() => this.removeToDont(index)}
                    >remove</uui-button
                  ></uui-table-cell
                ></uui-table-row
              >`
          )}
        </uui-table>
      </uui-box>
    `;
  }
}
