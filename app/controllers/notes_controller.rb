class NotesController < ApplicationController

  def index
    render json: Note.all
  end

  def create
    @note = Note.new(note_params)
    if @note.save
      flash[:notice] = 'Note was successfully created.'
    end
    render json: @note
  end

  def update
    @note = Note.find_by_day(note_params[:day])
    if @note.update(note_params)
      flash[:notice] = 'Note was successfully updated.'
    end
    render json: @note
  end

  private
    def note_params
      params.require(:note).permit(:day, :content)
    end

end
