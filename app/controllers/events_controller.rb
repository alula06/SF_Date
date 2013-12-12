class EventsController < ApplicationController
  before_action :signed_in_user, only: [:show]

  def index
          @app = Events.where("month = ? AND year = ?", params[:month], params[:year])
          render:json => @app
  end

  def show
  end

  def show_user
    @user = current_user
    render:json => @user
  end 

  def create
          @app = Events.new(app_params)
          @app.save
          render :nothing => true
  end

  private

  def app_params
          params.require(:apps).permit(:event, :day, :time, :month, :year, :location, :user)
  end
  private


end
